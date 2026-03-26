import { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getPageSectionsBySlug, type CmsPageSection, type CmsPageSectionsMap } from '../lib/api';

type SectionValue = string | Record<string, unknown> | null;

function parseSectionValue(section?: CmsPageSection): SectionValue {
  if (!section?.content) return null;
  if (section.content_type === 'json') {
    try {
      return JSON.parse(section.content);
    } catch {
      return null;
    }
  }
  return section.content;
}

export function useCmsPageContent(slug: string) {
  const { i18n } = useTranslation();
  const lang = i18n.language.startsWith('ar') ? 'ar' : 'en';
  const cmsEnabled = String(import.meta.env.VITE_ENABLE_CMS_CONTENT || '').toLowerCase() === 'true';

  const [sectionsMap, setSectionsMap] = useState<CmsPageSectionsMap>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = useCallback(async () => {
    if (!cmsEnabled) {
      setSectionsMap({});
      setError('');
      setLoading(false);
      return;
    }
    setLoading(true);
    setError('');
    const res = await getPageSectionsBySlug(slug, lang);
    if (res.success && res.sections) {
      setSectionsMap(res.sections);
    } else if (!res.success && 'error' in res) {
      setError(res.error || 'Failed to load page content.');
    }
    setLoading(false);
  }, [slug, lang, cmsEnabled]);

  useEffect(() => {
    load();
  }, [load]);

  const getSection = useCallback(
    (sectionKey: string): CmsPageSection | undefined => {
      const localized = sectionsMap[sectionKey]?.[lang];
      if (localized) return localized;
      return sectionsMap[sectionKey]?.en ?? sectionsMap[sectionKey]?.ar;
    },
    [sectionsMap, lang]
  );

  const getSectionValue = useCallback(
    (sectionKey: string): SectionValue => parseSectionValue(getSection(sectionKey)),
    [getSection]
  );

  const values = useMemo(
    () => ({
      getSection,
      getSectionValue,
    }),
    [getSection, getSectionValue]
  );

  return {
    ...values,
    sectionsMap,
    lang,
    loading,
    error,
    reload: load,
    cmsEnabled,
  };
}


import { useState, FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import '../styles/health-calculator.css';

function getBmiCategoryKey(bmi: number): 'underweight' | 'normal' | 'overweight' | 'obese' {
  if (bmi < 18.5) return 'underweight';
  if (bmi < 25) return 'normal';
  if (bmi < 30) return 'overweight';
  return 'obese';
}

export type HealthCalculatorVariant = 'default' | 'embedded' | 'page';

type Props = {
  variant?: HealthCalculatorVariant;
  activeCalculator?: 'bmi' | 'bmr';
  onTabChange?: (tab: 'bmi' | 'bmr') => void;
};

export default function HealthCalculator({ variant = 'default', activeCalculator: controlledTab, onTabChange }: Props) {
  const { t } = useTranslation();
  const [internalTab, setInternalTab] = useState<'bmi' | 'bmr'>('bmi');
  const activeCalculator = variant === 'page' && controlledTab != null ? controlledTab : internalTab;
  const setActiveCalculator = variant === 'page' && onTabChange ? onTabChange : setInternalTab;

  const [bmiWeight, setBmiWeight] = useState('70');
  const [bmiHeight, setBmiHeight] = useState('170');
  const [bmiResult, setBmiResult] = useState<number | null>(null);

  const [bmrWeight, setBmrWeight] = useState('70');
  const [bmrHeight, setBmrHeight] = useState('175');
  const [bmrAge, setBmrAge] = useState('25');
  const [bmrGender, setBmrGender] = useState<'male' | 'female'>('male');
  const [bmrResult, setBmrResult] = useState<number | null>(null);

  const onBmiSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const weight = parseFloat(bmiWeight);
    const height = parseFloat(bmiHeight) / 100;
    if (weight && height) {
      const bmi = weight / (height * height);
      setBmiResult(parseFloat(bmi.toFixed(1)));
    }
  };

  const onBmrSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const weight = parseFloat(bmrWeight);
    const height = parseFloat(bmrHeight);
    const age = parseFloat(bmrAge);
    if (weight && height && age) {
      const base = 10 * weight + 6.25 * height - 5 * age;
      const bmr = bmrGender === 'male' ? base + 5 : base - 161;
      setBmrResult(Math.round(bmr));
    }
  };

  const isPage = variant === 'page';

  return (
    <div className={`health-calculator health-calculator--${variant}`}>
      {variant === 'default' && (
        <>
          <p className="health-calculator__label">{t('healthCalculator.label')}</p>
          <h2 className="health-calculator__title">{t('healthCalculator.title')}</h2>
        </>
      )}

      {!isPage && (
        <div className="health-calculator__tabs">
          <button
            type="button"
            className={`health-calculator__tab ${activeCalculator === 'bmi' ? 'health-calculator__tab--active' : ''}`}
            onClick={() => setActiveCalculator('bmi')}
          >
            {t('healthCalculator.bmiTab')}
          </button>
          <button
            type="button"
            className={`health-calculator__tab ${activeCalculator === 'bmr' ? 'health-calculator__tab--active' : ''}`}
            onClick={() => setActiveCalculator('bmr')}
          >
            {t('healthCalculator.bmrTab')}
          </button>
        </div>
      )}

      {activeCalculator === 'bmi' && (
        isPage ? (
          <div className="health-calculator__card">
            <h2 className="health-calculator__card-title">{t('healthToolsPage.bmiCardTitle')}</h2>
            <p className="health-calculator__card-subtitle">{t('healthToolsPage.bmiCardSubtitle')}</p>
            <form className="health-calculator__form health-calculator__form--bmi health-calculator__form--card" onSubmit={onBmiSubmit}>
              <div className="health-calculator__fields health-calculator__fields--row">
                <div className="health-calculator__field">
                  <label className="health-calculator__field-label">{t('healthCalculator.weightKg')}</label>
                  <input type="number" placeholder="70" className="health-calculator__input" value={bmiWeight} onChange={(e) => setBmiWeight(e.target.value)} step="0.1" required />
                </div>
                <div className="health-calculator__field">
                  <label className="health-calculator__field-label">{t('healthCalculator.heightCm')}</label>
                  <input type="number" placeholder="170" className="health-calculator__input" value={bmiHeight} onChange={(e) => setBmiHeight(e.target.value)} step="0.1" required />
                </div>
              </div>
              <button type="submit" className="health-calculator__submit">
                {t('healthCalculator.calculateBmi')}
                <span className="health-calculator__submit-arrow" aria-hidden="true"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg></span>
              </button>
              {bmiResult !== null && (
                <div className="health-calculator__result health-calculator__result--bmi">
                  <div className="health-calculator__result-row">
                    <span className="health-calculator__result-label">{t('healthToolsPage.bmiCategoryLabel')}</span>
                    <span className="health-calculator__result-value">{t(`healthCalculator.bmiCategory.${getBmiCategoryKey(bmiResult)}`)}</span>
                  </div>
                  <div className="health-calculator__result-row">
                    <span className="health-calculator__result-label">{t('healthToolsPage.bmiValueLabel')}</span>
                    <span className="health-calculator__result-value">{bmiResult}</span>
                  </div>
                </div>
              )}
            </form>
          </div>
        ) : (
          <form className="health-calculator__form health-calculator__form--bmi" onSubmit={onBmiSubmit}>
            <div className="health-calculator__fields">
              <div className="health-calculator__field">
                <label className="health-calculator__field-label">{t('healthCalculator.weightKg')}</label>
                <input type="number" placeholder={t('healthCalculator.placeholderWeight')} className="health-calculator__input" value={bmiWeight} onChange={(e) => setBmiWeight(e.target.value)} step="0.1" required />
              </div>
              <div className="health-calculator__field">
                <label className="health-calculator__field-label">{t('healthCalculator.heightCm')}</label>
                <input type="number" placeholder={t('healthCalculator.placeholderHeight')} className="health-calculator__input" value={bmiHeight} onChange={(e) => setBmiHeight(e.target.value)} step="0.1" required />
              </div>
            </div>
            <button type="submit" className="health-calculator__submit">{t('healthCalculator.calculateBmi')}</button>
            {bmiResult !== null && (
              <div className="health-calculator__result">{t('healthCalculator.bmiResult', { value: bmiResult, category: t(`healthCalculator.bmiCategory.${getBmiCategoryKey(bmiResult)}`) })}</div>
            )}
          </form>
        )
      )}

      {activeCalculator === 'bmr' && (
        isPage ? (
          <div className="health-calculator__card">
            <h2 className="health-calculator__card-title">{t('healthToolsPage.bmrCardTitle')}</h2>
            <p className="health-calculator__card-subtitle">{t('healthToolsPage.bmrCardSubtitle')}</p>
            <form className="health-calculator__form health-calculator__form--card" onSubmit={onBmrSubmit}>
              <div className="health-calculator__fields health-calculator__fields--bmr">
                <div className="health-calculator__field">
                  <label className="health-calculator__field-label">{t('healthCalculator.weightKg')}</label>
                  <input type="number" placeholder="70" className="health-calculator__input" value={bmrWeight} onChange={(e) => setBmrWeight(e.target.value)} step="0.1" required />
                </div>
                <div className="health-calculator__field">
                  <label className="health-calculator__field-label">{t('healthCalculator.heightCm')}</label>
                  <input type="number" placeholder="175" className="health-calculator__input" value={bmrHeight} onChange={(e) => setBmrHeight(e.target.value)} step="0.1" required />
                </div>
                <div className="health-calculator__field">
                  <label className="health-calculator__field-label">{t('healthCalculator.age')}</label>
                  <input type="number" placeholder="25" className="health-calculator__input" value={bmrAge} onChange={(e) => setBmrAge(e.target.value)} min={1} max={120} required />
                </div>
                <div className="health-calculator__field">
                  <label className="health-calculator__field-label">{t('healthCalculator.gender')}</label>
                  <select className="health-calculator__input health-calculator__gender-select" value={bmrGender} onChange={(e) => setBmrGender(e.target.value as 'male' | 'female')}>
                    <option value="male">{t('healthCalculator.male')}</option>
                    <option value="female">{t('healthCalculator.female')}</option>
                  </select>
                </div>
              </div>
              <button type="submit" className="health-calculator__submit">
                {t('healthCalculator.calculateBmr')}
                <span className="health-calculator__submit-arrow" aria-hidden="true"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg></span>
              </button>
              <p className="health-calculator__disclaimer">{t('healthToolsPage.bmrDisclaimer')}</p>
              {bmrResult !== null && (
                <div className="health-calculator__result">{t('healthCalculator.bmrResult', { value: bmrResult })}</div>
              )}
            </form>
          </div>
        ) : (
          <form className="health-calculator__form" onSubmit={onBmrSubmit}>
            <div className="health-calculator__fields">
              <div className="health-calculator__field">
                <label className="health-calculator__field-label">{t('healthCalculator.weightKg')}</label>
                <input type="number" placeholder={t('healthCalculator.placeholderWeight')} className="health-calculator__input" value={bmrWeight} onChange={(e) => setBmrWeight(e.target.value)} step="0.1" required />
              </div>
              <div className="health-calculator__field">
                <label className="health-calculator__field-label">{t('healthCalculator.heightCm')}</label>
                <input type="number" placeholder={t('healthCalculator.placeholderHeight')} className="health-calculator__input" value={bmrHeight} onChange={(e) => setBmrHeight(e.target.value)} step="0.1" required />
              </div>
              <div className="health-calculator__field">
                <label className="health-calculator__field-label">{t('healthCalculator.age')}</label>
                <input type="number" placeholder={t('healthCalculator.placeholderAge')} className="health-calculator__input" value={bmrAge} onChange={(e) => setBmrAge(e.target.value)} min={1} max={120} required />
              </div>
              <div className="health-calculator__field">
                <label className="health-calculator__field-label">{t('healthCalculator.gender')}</label>
                <div className="health-calculator__gender">
                  <button type="button" className={`health-calculator__gender-btn ${bmrGender === 'male' ? 'health-calculator__gender-btn--active' : ''}`} onClick={() => setBmrGender('male')}>{t('healthCalculator.male')}</button>
                  <button type="button" className={`health-calculator__gender-btn ${bmrGender === 'female' ? 'health-calculator__gender-btn--active' : ''}`} onClick={() => setBmrGender('female')}>{t('healthCalculator.female')}</button>
                </div>
              </div>
            </div>
            <button type="submit" className="health-calculator__submit">{t('healthCalculator.calculateBmr')}</button>
            {bmrResult !== null && <div className="health-calculator__result">{t('healthCalculator.bmrResult', { value: bmrResult })}</div>}
          </form>
        )
      )}
    </div>
  );
}

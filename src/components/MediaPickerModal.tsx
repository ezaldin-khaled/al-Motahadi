import { useCallback, useEffect, useState, type ChangeEvent } from 'react';
import { getMediaFiles, uploadMedia, type MediaFile } from '../lib/api';

type MediaPickerModalProps = {
  open: boolean;
  title: string;
  onClose: () => void;
  onSelect: (file: MediaFile) => void;
};

export default function MediaPickerModal({
  open,
  title,
  onClose,
  onSelect,
}: MediaPickerModalProps) {
  const [files, setFiles] = useState<MediaFile[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const loadFiles = useCallback(async () => {
    setLoading(true);
    setError('');
    const res = await getMediaFiles();
    if (res.success && res.files) {
      setFiles(res.files);
    } else {
      setError(res.error || 'Failed to load media.');
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (open) loadFiles();
  }, [open, loadFiles]);

  const handleUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const res = await uploadMedia(file);
    if (res.success && res.file) {
      setFiles(prev => [res.file as MediaFile, ...prev]);
    } else {
      setError(res.error || 'Upload failed.');
    }
    setUploading(false);
    event.target.value = '';
  };

  if (!open) return null;

  return (
    <div
      className="dashboard-modal-backdrop"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="dashboard-modal dashboard-modal--wide"
        onClick={e => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <div className="dashboard-modal-header">
          <h2>{title}</h2>
          <button type="button" className="dashboard-modal-close" onClick={onClose}>
            ×
          </button>
        </div>
        <div className="dashboard-modal-body">
          <div className="dashboard-media-picker-toolbar">
            <label className="dashboard-btn dashboard-btn--primary">
              {uploading ? 'Uploading...' : 'Upload Image'}
              <input type="file" accept="image/*" style={{ display: 'none' }} onChange={handleUpload} />
            </label>
            <button type="button" className="dashboard-btn" onClick={loadFiles}>
              Refresh
            </button>
          </div>
          {error && <p className="dashboard-error">{error}</p>}
          {loading ? (
            <p className="dashboard-loading">Loading media...</p>
          ) : (
            <div className="dashboard-media-grid">
              {files.map(file => (
                <button
                  key={file.id}
                  type="button"
                  className="dashboard-media-item dashboard-media-item--selectable"
                  onClick={() => {
                    onSelect(file);
                    onClose();
                  }}
                >
                  <img
                    src={file.url}
                    alt={file.alt_text || file.original_name}
                    className="dashboard-media-thumb"
                  />
                  <div className="dashboard-media-info">
                    <span className="dashboard-media-name">{file.original_name}</span>
                    <span className="dashboard-media-url">{file.url}</span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


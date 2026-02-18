import { useState, FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import '../styles/health-calculator.css';

function getBmiCategoryKey(bmi: number): 'underweight' | 'normal' | 'overweight' | 'obese' {
  if (bmi < 18.5) return 'underweight';
  if (bmi < 25) return 'normal';
  if (bmi < 30) return 'overweight';
  return 'obese';
}

export type HealthCalculatorVariant = 'default' | 'embedded';

type Props = {
  variant?: HealthCalculatorVariant;
};

export default function HealthCalculator({ variant = 'default' }: Props) {
  const { t } = useTranslation();
  const [activeCalculator, setActiveCalculator] = useState<'bmi' | 'bmr'>('bmi');

  const [bmiWeight, setBmiWeight] = useState('');
  const [bmiHeight, setBmiHeight] = useState('');
  const [bmiResult, setBmiResult] = useState<number | null>(null);

  const [bmrWeight, setBmrWeight] = useState('');
  const [bmrHeight, setBmrHeight] = useState('');
  const [bmrAge, setBmrAge] = useState('');
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

  return (
    <div className={`health-calculator health-calculator--${variant}`}>
      {variant === 'default' && (
        <>
          <p className="health-calculator__label">{t('healthCalculator.label')}</p>
          <h2 className="health-calculator__title">{t('healthCalculator.title')}</h2>
        </>
      )}

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

      {activeCalculator === 'bmi' && (
        <form className="health-calculator__form health-calculator__form--bmi" onSubmit={onBmiSubmit}>
          <div className="health-calculator__fields">
            <div className="health-calculator__field">
              <label className="health-calculator__field-label">{t('healthCalculator.weightKg')}</label>
              <input
                type="number"
                placeholder={t('healthCalculator.placeholderWeight')}
                className="health-calculator__input"
                value={bmiWeight}
                onChange={(e) => setBmiWeight(e.target.value)}
                step="0.1"
                required
              />
            </div>
            <div className="health-calculator__field">
              <label className="health-calculator__field-label">{t('healthCalculator.heightCm')}</label>
              <input
                type="number"
                placeholder={t('healthCalculator.placeholderHeight')}
                className="health-calculator__input"
                value={bmiHeight}
                onChange={(e) => setBmiHeight(e.target.value)}
                step="0.1"
                required
              />
            </div>
          </div>
          <button type="submit" className="health-calculator__submit">
            {t('healthCalculator.calculateBmi')}
          </button>
          {bmiResult !== null && (
            <div className="health-calculator__result">
              {t('healthCalculator.bmiResult', { value: bmiResult, category: t(`healthCalculator.bmiCategory.${getBmiCategoryKey(bmiResult)}`) })}
            </div>
          )}
        </form>
      )}

      {activeCalculator === 'bmr' && (
        <form className="health-calculator__form" onSubmit={onBmrSubmit}>
          <div className="health-calculator__fields">
            <div className="health-calculator__field">
              <label className="health-calculator__field-label">{t('healthCalculator.weightKg')}</label>
              <input
                type="number"
                placeholder={t('healthCalculator.placeholderWeight')}
                className="health-calculator__input"
                value={bmrWeight}
                onChange={(e) => setBmrWeight(e.target.value)}
                step="0.1"
                required
              />
            </div>
            <div className="health-calculator__field">
              <label className="health-calculator__field-label">{t('healthCalculator.heightCm')}</label>
              <input
                type="number"
                placeholder={t('healthCalculator.placeholderHeight')}
                className="health-calculator__input"
                value={bmrHeight}
                onChange={(e) => setBmrHeight(e.target.value)}
                step="0.1"
                required
              />
            </div>
            <div className="health-calculator__field">
              <label className="health-calculator__field-label">{t('healthCalculator.age')}</label>
              <input
                type="number"
                placeholder={t('healthCalculator.placeholderAge')}
                className="health-calculator__input"
                value={bmrAge}
                onChange={(e) => setBmrAge(e.target.value)}
                min={1}
                max={120}
                required
              />
            </div>
            <div className="health-calculator__field">
              <label className="health-calculator__field-label">{t('healthCalculator.gender')}</label>
              <div className="health-calculator__gender">
                <button
                  type="button"
                  className={`health-calculator__gender-btn ${bmrGender === 'male' ? 'health-calculator__gender-btn--active' : ''}`}
                  onClick={() => setBmrGender('male')}
                >
                  {t('healthCalculator.male')}
                </button>
                <button
                  type="button"
                  className={`health-calculator__gender-btn ${bmrGender === 'female' ? 'health-calculator__gender-btn--active' : ''}`}
                  onClick={() => setBmrGender('female')}
                >
                  {t('healthCalculator.female')}
                </button>
              </div>
            </div>
          </div>
          <button type="submit" className="health-calculator__submit">
            {t('healthCalculator.calculateBmr')}
          </button>
          {bmrResult !== null && (
            <div className="health-calculator__result">
              {t('healthCalculator.bmrResult', { value: bmrResult })}
            </div>
          )}
        </form>
      )}
    </div>
  );
}

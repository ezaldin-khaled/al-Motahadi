import { useState, FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import '../styles/health-calculator.css';
import {
  calculateBmiSmart,
  calculateBmrSmart,
  type ActivityLevel,
  type BmiSmartResult,
  type BmrSmartResult,
  type Gender,
  type Goal,
} from '../lib/healthInsights';

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
  const [bmiAge, setBmiAge] = useState('25');
  const [bmiGender, setBmiGender] = useState<Gender>('male');
  const [bmiResult, setBmiResult] = useState<BmiSmartResult | null>(null);

  const [bmrWeight, setBmrWeight] = useState('70');
  const [bmrHeight, setBmrHeight] = useState('175');
  const [bmrAge, setBmrAge] = useState('25');
  const [bmrGender, setBmrGender] = useState<Gender>('male');
  const [bmrActivityLevel, setBmrActivityLevel] = useState<ActivityLevel>('moderate');
  const [bmrGoal, setBmrGoal] = useState<Goal>('maintain');
  const [bmrResult, setBmrResult] = useState<BmrSmartResult | null>(null);

  const onBmiSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const weight = parseFloat(bmiWeight);
    const height = parseFloat(bmiHeight);
    const age = parseFloat(bmiAge);
    if (weight > 0 && height > 0 && age > 0) {
      setBmiResult(calculateBmiSmart({
        gender: bmiGender,
        age,
        height_cm: height,
        weight_kg: weight,
      }));
    }
  };

  const onBmrSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const weight = parseFloat(bmrWeight);
    const height = parseFloat(bmrHeight);
    const age = parseFloat(bmrAge);
    if (weight > 0 && height > 0 && age > 0) {
      setBmrResult(calculateBmrSmart({
        gender: bmrGender,
        age,
        height_cm: height,
        weight_kg: weight,
        activity_level: bmrActivityLevel,
        goal: bmrGoal,
      }));
    }
  };

  const isPage = variant === 'page';
  const bmiCategoryKey = bmiResult?.category_key ?? 'normal';
  const bmrHiddenCauseKey = bmrResult && bmrResult.bmi_value < 18.5
    ? 'hidden_cause_underweight'
    : bmrResult && bmrResult.bmi_value >= 25
      ? 'hidden_cause_overweight'
      : 'hidden_cause_neutral';

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
                <div className="health-calculator__field">
                  <label className="health-calculator__field-label">{t('healthCalculator.age')}</label>
                  <input type="number" placeholder="25" className="health-calculator__input" value={bmiAge} onChange={(e) => setBmiAge(e.target.value)} min={1} max={120} required />
                </div>
                <div className="health-calculator__field">
                  <label className="health-calculator__field-label">{t('healthCalculator.gender')}</label>
                  <select className="health-calculator__input health-calculator__gender-select" value={bmiGender} onChange={(e) => setBmiGender(e.target.value as Gender)}>
                    <option value="male">{t('healthCalculator.male')}</option>
                    <option value="female">{t('healthCalculator.female')}</option>
                  </select>
                </div>
              </div>
              <button type="submit" className="health-calculator__submit">
                {t('healthCalculator.calculateBmi')}
                <span className="health-calculator__submit-arrow" aria-hidden="true"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg></span>
              </button>
              {bmiResult !== null && (
                <div className="health-calculator__result health-calculator__result--bmi health-calculator__result--rich">
                  <div className="health-calculator__result-row">
                    <span className="health-calculator__result-label">{t('healthToolsPage.bmiCategoryLabel')}</span>
                    <span className="health-calculator__result-value">{t(`healthCalculator.smart.bmi.${bmiCategoryKey}.category_label`)}</span>
                  </div>
                  <div className="health-calculator__result-row">
                    <span className="health-calculator__result-label">{t('healthToolsPage.bmiValueLabel')}</span>
                    <span className="health-calculator__result-value">{bmiResult.result_value}</span>
                  </div>
                  <div className="health-calculator__result-row">
                    <span className="health-calculator__result-label">{t('healthCalculator.smart.riskLabel')}</span>
                    <span className="health-calculator__result-value">{t(`healthCalculator.smart.risk.${bmiResult.risk_flag}`)}</span>
                  </div>
                  <p className="health-calculator__smart-message">{t(`healthCalculator.smart.bmi.${bmiCategoryKey}.smart_message`)}</p>
                  <p className="health-calculator__smart-detail">{t(`healthCalculator.smart.bmi.${bmiCategoryKey}.body_analysis`)}</p>
                  <ul className="health-calculator__smart-list">
                    <li>{t(`healthCalculator.smart.bmi.${bmiCategoryKey}.action_plan_1`)}</li>
                    <li>{t(`healthCalculator.smart.bmi.${bmiCategoryKey}.action_plan_2`)}</li>
                    <li>{t(`healthCalculator.smart.bmi.${bmiCategoryKey}.action_plan_3`)}</li>
                  </ul>
                  <p className="health-calculator__smart-detail">
                    <strong>{t('healthCalculator.smart.nutritionLabel')}:</strong> {t(`healthCalculator.smart.bmi.${bmiCategoryKey}.nutrition_strategy`)}
                  </p>
                  <p className="health-calculator__smart-detail">
                    <strong>{t('healthCalculator.smart.behaviorLabel')}:</strong> {t(`healthCalculator.smart.bmi.${bmiCategoryKey}.behavior_trigger`)}
                  </p>
                  <p className="health-calculator__smart-detail">
                    <strong>{t('healthCalculator.smart.quickStartLabel')}:</strong> {t(`healthCalculator.smart.bmi.${bmiCategoryKey}.quick_start`)}
                  </p>
                  <p className="health-calculator__smart-warning">{t('healthCalculator.smart.warningGeneral')}</p>
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
              <div className="health-calculator__field">
                <label className="health-calculator__field-label">{t('healthCalculator.age')}</label>
                <input type="number" placeholder={t('healthCalculator.placeholderAge')} className="health-calculator__input" value={bmiAge} onChange={(e) => setBmiAge(e.target.value)} min={1} max={120} required />
              </div>
              <div className="health-calculator__field">
                <label className="health-calculator__field-label">{t('healthCalculator.gender')}</label>
                <div className="health-calculator__gender">
                  <button type="button" className={`health-calculator__gender-btn ${bmiGender === 'male' ? 'health-calculator__gender-btn--active' : ''}`} onClick={() => setBmiGender('male')}>{t('healthCalculator.male')}</button>
                  <button type="button" className={`health-calculator__gender-btn ${bmiGender === 'female' ? 'health-calculator__gender-btn--active' : ''}`} onClick={() => setBmiGender('female')}>{t('healthCalculator.female')}</button>
                </div>
              </div>
            </div>
            <button type="submit" className="health-calculator__submit">{t('healthCalculator.calculateBmi')}</button>
            {bmiResult !== null && (
              <div className="health-calculator__result health-calculator__result--rich">
                <div className="health-calculator__result-row">
                  <span className="health-calculator__result-label">{t('healthToolsPage.bmiCategoryLabel')}</span>
                  <span className="health-calculator__result-value">{t(`healthCalculator.smart.bmi.${bmiCategoryKey}.category_label`)}</span>
                </div>
                <div className="health-calculator__result-row">
                  <span className="health-calculator__result-label">{t('healthToolsPage.bmiValueLabel')}</span>
                  <span className="health-calculator__result-value">{bmiResult.result_value}</span>
                </div>
                <p className="health-calculator__smart-message">{t(`healthCalculator.smart.bmi.${bmiCategoryKey}.smart_message`)}</p>
                <p className="health-calculator__smart-warning">{t('healthCalculator.smart.warningGeneral')}</p>
              </div>
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
                  <select className="health-calculator__input health-calculator__gender-select" value={bmrGender} onChange={(e) => setBmrGender(e.target.value as Gender)}>
                    <option value="male">{t('healthCalculator.male')}</option>
                    <option value="female">{t('healthCalculator.female')}</option>
                  </select>
                </div>
                <div className="health-calculator__field">
                  <label className="health-calculator__field-label">{t('healthCalculator.activityLevel')}</label>
                  <select className="health-calculator__input health-calculator__gender-select" value={bmrActivityLevel} onChange={(e) => setBmrActivityLevel(e.target.value as ActivityLevel)}>
                    <option value="sedentary">{t('healthCalculator.activityOptions.sedentary')}</option>
                    <option value="light">{t('healthCalculator.activityOptions.light')}</option>
                    <option value="moderate">{t('healthCalculator.activityOptions.moderate')}</option>
                    <option value="active">{t('healthCalculator.activityOptions.active')}</option>
                    <option value="very_active">{t('healthCalculator.activityOptions.very_active')}</option>
                  </select>
                </div>
                <div className="health-calculator__field">
                  <label className="health-calculator__field-label">{t('healthCalculator.goal')}</label>
                  <select className="health-calculator__input health-calculator__gender-select" value={bmrGoal} onChange={(e) => setBmrGoal(e.target.value as Goal)}>
                    <option value="lose">{t('healthCalculator.goalOptions.lose')}</option>
                    <option value="maintain">{t('healthCalculator.goalOptions.maintain')}</option>
                    <option value="gain">{t('healthCalculator.goalOptions.gain')}</option>
                  </select>
                </div>
              </div>
              <button type="submit" className="health-calculator__submit">
                {t('healthCalculator.calculateBmr')}
                <span className="health-calculator__submit-arrow" aria-hidden="true"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg></span>
              </button>
              <p className="health-calculator__disclaimer">{t('healthToolsPage.bmrDisclaimer')}</p>
              {bmrResult !== null && (
                <div className="health-calculator__result health-calculator__result--rich">
                  <div className="health-calculator__result-row">
                    <span className="health-calculator__result-label">{t('healthCalculator.smart.bmr.bmrLabel')}</span>
                    <span className="health-calculator__result-value">{bmrResult.bmr_value}</span>
                  </div>
                  <div className="health-calculator__result-row">
                    <span className="health-calculator__result-label">{t('healthCalculator.smart.bmr.dailyCaloriesLabel')}</span>
                    <span className="health-calculator__result-value">{bmrResult.daily_calories}</span>
                  </div>
                  <p className="health-calculator__smart-message">{t('healthCalculator.smart.bmr.smart_interpretation')}</p>
                  <p className="health-calculator__smart-detail">{t('healthCalculator.smart.bmr.energy_balance_analysis')}</p>
                  <p className="health-calculator__smart-detail">{t(`healthCalculator.smart.bmr.${bmrHiddenCauseKey}`)}</p>
                  <p className="health-calculator__smart-detail">
                    <strong>{t('healthCalculator.smart.goalStrategyLabel')}:</strong> {t(`healthCalculator.smart.bmr.goal_strategy.${bmrGoal}`)}
                  </p>
                  <p className="health-calculator__smart-detail">
                    <strong>{t('healthCalculator.smart.behaviorLabel')}:</strong> {t(`healthCalculator.smart.bmr.behavior_trigger.${bmrGoal}`)}
                  </p>
                  <p className="health-calculator__smart-detail">
                    <strong>{t('healthCalculator.smart.quickActionLabel')}:</strong> {t(`healthCalculator.smart.bmr.quick_action.${bmrGoal}`)}
                  </p>
                  <p className="health-calculator__smart-warning">{t('healthCalculator.smart.warningGeneral')}</p>
                </div>
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
              <div className="health-calculator__field">
                <label className="health-calculator__field-label">{t('healthCalculator.activityLevel')}</label>
                <select className="health-calculator__input health-calculator__gender-select" value={bmrActivityLevel} onChange={(e) => setBmrActivityLevel(e.target.value as ActivityLevel)}>
                  <option value="sedentary">{t('healthCalculator.activityOptions.sedentary')}</option>
                  <option value="light">{t('healthCalculator.activityOptions.light')}</option>
                  <option value="moderate">{t('healthCalculator.activityOptions.moderate')}</option>
                  <option value="active">{t('healthCalculator.activityOptions.active')}</option>
                  <option value="very_active">{t('healthCalculator.activityOptions.very_active')}</option>
                </select>
              </div>
              <div className="health-calculator__field">
                <label className="health-calculator__field-label">{t('healthCalculator.goal')}</label>
                <select className="health-calculator__input health-calculator__gender-select" value={bmrGoal} onChange={(e) => setBmrGoal(e.target.value as Goal)}>
                  <option value="lose">{t('healthCalculator.goalOptions.lose')}</option>
                  <option value="maintain">{t('healthCalculator.goalOptions.maintain')}</option>
                  <option value="gain">{t('healthCalculator.goalOptions.gain')}</option>
                </select>
              </div>
            </div>
            <button type="submit" className="health-calculator__submit">{t('healthCalculator.calculateBmr')}</button>
            {bmrResult !== null && (
              <div className="health-calculator__result health-calculator__result--rich">
                <div className="health-calculator__result-row">
                  <span className="health-calculator__result-label">{t('healthCalculator.smart.bmr.bmrLabel')}</span>
                  <span className="health-calculator__result-value">{bmrResult.bmr_value}</span>
                </div>
                <div className="health-calculator__result-row">
                  <span className="health-calculator__result-label">{t('healthCalculator.smart.bmr.dailyCaloriesLabel')}</span>
                  <span className="health-calculator__result-value">{bmrResult.daily_calories}</span>
                </div>
                <p className="health-calculator__smart-message">{t('healthCalculator.smart.bmr.smart_interpretation')}</p>
                <p className="health-calculator__smart-warning">{t('healthCalculator.smart.warningGeneral')}</p>
              </div>
            )}
          </form>
        )
      )}
    </div>
  );
}

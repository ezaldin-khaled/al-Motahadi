export type Gender = 'male' | 'female';
export type Goal = 'lose' | 'gain' | 'maintain';
export type ActivityLevel = 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active';

export type SmartBmiCategory =
  | 'underweight_severe'
  | 'underweight_mild'
  | 'normal'
  | 'overweight_low'
  | 'overweight_high'
  | 'obesity_1_low'
  | 'obesity_1_high'
  | 'obesity_2'
  | 'obesity_3';

export type BmiRisk = 'low' | 'medium' | 'high' | 'very_high';

export type BmiInput = {
  gender: Gender;
  age: number;
  height_cm: number;
  weight_kg: number;
};

export type BmrInput = {
  gender: Gender;
  age: number;
  height_cm: number;
  weight_kg: number;
  activity_level: ActivityLevel;
  goal: Goal;
};

export type BmiSmartResult = {
  result_value: number;
  category_key: SmartBmiCategory;
  risk_flag: BmiRisk;
};

export type BmrSmartResult = {
  bmr_value: number;
  daily_calories: number;
  bmi_value: number;
  bmi_category: SmartBmiCategory;
};

const ACTIVITY_MULTIPLIER: Record<ActivityLevel, number> = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  active: 1.725,
  very_active: 1.9,
};

export function classifyBmiSmart(bmi: number): SmartBmiCategory {
  if (bmi < 17) return 'underweight_severe';
  if (bmi < 18.5) return 'underweight_mild';
  if (bmi < 25) return 'normal';
  if (bmi < 27) return 'overweight_low';
  if (bmi < 30) return 'overweight_high';
  if (bmi < 32.5) return 'obesity_1_low';
  if (bmi < 35) return 'obesity_1_high';
  if (bmi < 40) return 'obesity_2';
  return 'obesity_3';
}

export function getRiskFromCategory(category: SmartBmiCategory): BmiRisk {
  if (category === 'normal' || category === 'underweight_mild' || category === 'overweight_low') return 'low';
  if (category === 'obesity_2') return 'high';
  if (category === 'obesity_3') return 'very_high';
  return 'medium';
}

export function calculateBmiSmart(input: BmiInput): BmiSmartResult {
  const heightM = input.height_cm / 100;
  const bmi = input.weight_kg / (heightM * heightM);
  const result = Number(bmi.toFixed(1));
  const category = classifyBmiSmart(result);

  return {
    result_value: result,
    category_key: category,
    risk_flag: getRiskFromCategory(category),
  };
}

export function calculateBmrSmart(input: BmrInput): BmrSmartResult {
  const base = 10 * input.weight_kg + 6.25 * input.height_cm - 5 * input.age;
  const bmr = input.gender === 'male' ? base + 5 : base - 161;
  const bmrRounded = Math.round(bmr);

  const tdee = bmrRounded * ACTIVITY_MULTIPLIER[input.activity_level];
  const daily =
    input.goal === 'lose' ? tdee - 400 :
    input.goal === 'gain' ? tdee + 300 :
    tdee;

  const bmiHeightM = input.height_cm / 100;
  const bmiValue = Number((input.weight_kg / (bmiHeightM * bmiHeightM)).toFixed(1));

  return {
    bmr_value: bmrRounded,
    daily_calories: Math.round(daily),
    bmi_value: bmiValue,
    bmi_category: classifyBmiSmart(bmiValue),
  };
}

export interface AuthResponse {
  token: string;
}

export interface Profile {
  age: number;
  height: number;
  weight: number;
  gender: string;
  goal: string;
  skillLevel: string;
  position: string;
}

export interface Exercise {
  name: string;
  sets: string;
  reps: string;
  rest: string;
  imageUrl?: string;
}

export interface WorkoutSession {
  sessionName: string;
  focusArea: string;
  exercises: Exercise[];
}

export interface Meal {
  mealName: string;
  items: string[];
}

export interface DietPlan {
  totalCalories: number;
  protein: number;
  carbs: number;
  fats: number;
  meals: Meal[];
}

export interface DailyPlan {
  workoutPlan: WorkoutSession[];
  dietPlan: DietPlan;
  date: string;
}

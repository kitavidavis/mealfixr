"use client";
import { MultiSelect, Notification, Select, Slider } from '@mantine/core';
import React, { useState } from 'react';
import { remark } from 'remark';
import html from 'remark-html';

export default function MealPlannerForm() {
    const [step, setStep] = useState(0);
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("");
    const [weight, setWeight] = useState("");
    const [blood_type, setBloodType] = useState("");
    const [allergies, setAllergies] = useState([]);
    const [diet, setDiet] = useState("");
    const [daily_actual_calorie_consumption, setDailyActualCalorieConsumption] = useState(0);
    const [daily_projected_calorie_limit, setDailyProjectedCalorieLimit] = useState(0);
    const [salt_limit_per_meal, setSaltLimitPerMeal] = useState(0);
    const [sugar_limit_per_meal, setSugarLimitPerMeal] = useState(0);
    const [spice_limit, setSpiceLimit] = useState("");
    const [cuisine_influence, setCuisineInfluence] = useState([]);
    const [food_preferences, setFoodPreferences] = useState([]);
    const [number_of_meals_per_day, setNumberOfMealsPerDay] = useState(1);
    const [health_goals, setHealthGoals] = useState([]);
    const [activity_level, setActivityLevel] = useState(1);
    const [type_of_activity, setTypeOfActivity] = useState(1);
    const [workout_time_per_day, setWorkoutTimePerDay] = useState(1);
    const [workout_quantity_per_week, setWorkoutQuantityPerWeek] = useState(1);
    const [plans, setPlans] = useState("");
    const [loading, setLoading] = useState(false);
    const [meal_plan, setMealPlan] = useState("");
    const [error, setError] = useState({with_error: false, error: ""})

    const createMealPlan = () => {
        setLoading(true);

        const prompt = `
        I am a virtual dietician assistant.
        The user is ${age} years old, ${gender}.
        The user weighs ${weight} and has blood type ${blood_type}.
        The user has the following allergies: ${allergies.join(",")}.
        The user currently follows a ${diet} diet.
        The user's actual daily calorie consumption is approximately ${daily_actual_calorie_consumption} calories.
        The user's projected daily calorie limit is ${daily_projected_calorie_limit} calories.
        The user's salt limit per meal is ${salt_limit_per_meal} miligrams.
        The user's sugar limit per meal is ${sugar_limit_per_meal} miligrams.
        The user spice limit is ${spice_limit} out of 10, where 1 represents a very mild spice limit and 10 represents an extremely hot spice limit.
        The user's cuisine influences are ${cuisine_influence.join(",")}.
        The user enjoys eating ${food_preferences.join(",")}.
        The user consumes ${number_of_meals_per_day} meals per day.
        The user's health goals are ${health_goals.join(",")}.
        The user's activity level is ${activity_level} out of 10, where 1 is not active at all and 10 a professional athlete.
        The user's type of activity is ${type_of_activity} out of 10, where 1 represents flexible activities, 5 represents aerobic activities and 10 represents muscle strengthening activities.
        The user spends ${workout_time_per_day} hours on workouts daily.
        The user works out ${workout_quantity_per_week} times per week.
        The user wants ${plans} meal plans generated.
        
        Please create personalized meal plans for the user, taking into account all the provided information. Each meal plan should:
        
        Be within the user's daily projected calorie limit of ${daily_actual_calorie_consumption} calories.
        Adhere to the user's ${diet} dietary restrictions while considering allergies and food preferences.
        Include ${number_of_meals_per_day} meals (breakfast, lunch, dinner, and [optional: snacks]).
        Stay within the salt limit of ${salt_limit_per_meal} miligrams per meal.
        Stay within the sugar limit of ${salt_limit_per_meal} miligrams per meal.
        Match the user's spiciness preference of ${spice_limit}.
        Incorporate influences from the user's preferred cuisines: ${cuisine_influence.join(",")}.
        Prioritize foods the user enjoys: ${food_preferences.join(",")}.
        Support the user's health goals of ${health_goals.join(",")}.
        Account for the user's activity level of ${activity_level} and type of activity: ${type_of_activity}.
        Cater to the user's workout schedule with ${workout_time_per_day} hours daily workout time and ${workout_quantity_per_week} workouts per week.
        
        For each meal plan, provide a comprehensive recipe and all the ingredients required to create the meal.
        `

        fetch('/api/mealplanner', {
            method: 'POST',
            body: JSON.stringify({
                prompt: prompt
             })
        })
        .then(response => response.json())
        .then(async (data) => {
            setLoading(false);
            const processedContent = await remark()
                .use(html)
                .process(data.text.content);
            const contentHtml = processedContent.toString();
            setMealPlan(contentHtml);
        })
        .catch((error) => {
            console.error(error);
            setError({with_error: true, error: "Sorry!An issue occured while generating your meal plan"})
            setLoading(false);

            setTimeout(() => {
                setError({with_error: false, error: ""});
            }, 10000);
        });
        
    }

    const Welcome = () => {
        return (
            <div className="video-content space-y-2">
            <h1 className="font-bold text-2xl lg:text-4xl pb-5">
            Your Perfect Plate Awaits
            </h1>
            <h3 className="font-light text-2xl pb-20">
            Say goodbye to boring meals! MealFixr personalizes your diet based on your preferences, allergies, and goals. Get recipe suggestions, grocery lists, and calorie tracking – all in one place.
            </h3>
    
            <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
                <button
                    onClick={() => {setStep(1)}}
                  className="inline-flex justify-center items-center py-3 px-5 text-base font-bold text-center text-white rounded-full border border-orange-600 bg-orange-600 focus:ring-4 focus:ring-gray-400"
                >
                  Let&apos;s Get Started &rarr;
                </button>
              </div>
        </div>
        )
    }

    const AgeForm = () => {
        return (
            <div className="video-content space-y-2">
            <h1 className="font-bold text-2xl lg:text-4xl pb-5">
            What is your age?
            </h1>
            <h3 className="font-light text-2xl pb-10">
            Understanding your age helps us tailor your experience. Please select your age bracket from the list below:
            </h3>

            <Select data={[
                {label: "18 - 25", value: "18 - 25"},
                {label: "26 - 30", value: "26 - 30"},
                {label: "31 - 40", value: "31 - 40"},
                {label: "41 - 50", value: "41 - 50"},
                {label: "51 - 60", value: "51 - 60"},
                {label: "61 - 70", value: "61 - 70"},
                {label: "71+", value: "71+"}
            ]} value={age} onChange={(val) => {setAge(val)}} mb={30} required />
    
            <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
            <button
                    onClick={() => {setStep(0)}}
                  className="inline-flex justify-center items-center py-3 px-5 text-base font-bold text-center text-white rounded-full border border-white hover:border-orange-600 hover:bg-orange-600 focus:ring-4 focus:ring-gray-400 bg-transparent"
                >
                  Previous
                </button>

                <button
                disabled={age.trim().length === 0}
                onClick={() => {setStep(2)}}
                  className="inline-flex justify-center items-center py-3 px-5 text-base font-bold text-center text-white rounded-full border border-orange-600 bg-orange-600 focus:ring-4 focus:ring-gray-400"
                >
                  Continue
                </button>
              </div>
        </div>
        )
    }

    const GenderForm = () => {
        return (
            <div className="video-content space-y-2">
            <h1 className="font-bold text-2xl lg:text-4xl pb-5">
            What is your gender?
            </h1>
            <h3 className="font-light text-2xl pb-10">
            Understanding your gender helps us tailor your experience. Please select your gender from the options below:
            </h3>

            <Select data={[
                {label: "Male", value: "Male"},
                {label: "Female", value: "Female"},
            ]} value={gender} onChange={(val) => {setGender(val)}} mb={30} required />
    
            <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
            <button
                    onClick={() => {setStep(1)}}
                  className="inline-flex justify-center items-center py-3 px-5 text-base font-bold text-center text-white rounded-full border border-white hover:border-orange-600 hover:bg-orange-600 focus:ring-4 focus:ring-gray-400 bg-transparent"
                >
                  Previous
                </button>

                <button
                disabled={gender.trim().length === 0}
                onClick={() => {setStep(3)}}
                  className="inline-flex justify-center items-center py-3 px-5 text-base font-bold text-center text-white rounded-full border border-orange-600 bg-orange-600 focus:ring-4 focus:ring-gray-400"
                >
                  Continue
                </button>
              </div>
        </div>
        )
    }

    const WeightForm = () => {
        return (
            <div className="video-content space-y-2">
            <h1 className="font-bold text-2xl lg:text-4xl pb-5">
            What is your weight?
            </h1>
            <h3 className="font-light text-2xl pb-10">
            Understanding your weight helps us tailor your experience. Please select your weight from the options below:
            </h3>

            <Select data={[
                {label: "50KG - 60KG", value: "50KG - 60KG"},
                {label: "61KG - 70KG", value: "61KG - 70KG"},
                {label: "71KG - 80KG", value: "71KG - 80KG"},
                {label: "81KG - 90KG", value: "81KG - 90KG"},
                {label: "91KG - 100KG", value: "91KG - 100KG"},
                {label: "101KG - 120KG", value: "101KG - 120KG"},
                {label: "121KG - 140KG", value: "121KG - 140KG"},
                {label: "+141KG", value: "+141KG"},

            ]} value={weight} onChange={(val) => {setWeight(val)}} mb={30} required />
    
            <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
            <button
                    onClick={() => {setStep(2)}}
                  className="inline-flex justify-center items-center py-3 px-5 text-base font-bold text-center text-white rounded-full border border-white hover:border-orange-600 hover:bg-orange-600 focus:ring-4 focus:ring-gray-400 bg-transparent"
                >
                  Previous
                </button>

                <button
                disabled={weight.trim().length === 0}
                onClick={() => {setStep(4)}}
                  className="inline-flex justify-center items-center py-3 px-5 text-base font-bold text-center text-white rounded-full border border-orange-600 bg-orange-600 focus:ring-4 focus:ring-gray-400"
                >
                  Continue
                </button>
              </div>
        </div>
        )
    }

    const BloodTypeForm = () => {
        return (
            <div className="video-content space-y-2">
            <h1 className="font-bold text-2xl lg:text-4xl pb-5">
            What is your blood type?
            </h1>
            <h3 className="font-light text-2xl pb-10">
            Understanding your blood type helps us tailor your experience. Please select your blood type from the options below:
            </h3>

            <Select data={[
                {label: "A", value: "A"},
                {label: "B", value: "B"},
                {label: "A/B", value: "A/B"},
                {label: "O", value: "O"},
            ]} value={blood_type} onChange={(val) => {setBloodType(val)}} mb={30} required />
    
            <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
            <button
                    onClick={() => {setStep(3)}}
                  className="inline-flex justify-center items-center py-3 px-5 text-base font-bold text-center text-white rounded-full border border-white hover:border-orange-600 hover:bg-orange-600 focus:ring-4 focus:ring-gray-400 bg-transparent"
                >
                  Previous
                </button>

                <button
                disabled={blood_type.trim().length === 0}
                onClick={() => {setStep(5)}}
                  className="inline-flex justify-center items-center py-3 px-5 text-base font-bold text-center text-white rounded-full border border-orange-600 bg-orange-600 focus:ring-4 focus:ring-gray-400"
                >
                  Continue
                </button>
              </div>
        </div>
        )
    }

    const AllergiesForm = () => {
        return (
            <div className="video-content space-y-2">
            <h1 className="font-bold text-2xl lg:text-4xl pb-5">
            What are your allergies?
            </h1>
            <h3 className="font-light text-2xl pb-10">
            Understanding your weight helps us tailor your experience. Please select your weight from the options below:
            </h3>

            <MultiSelect data={[
                {label: "Celery", value: "Celery"},
                {label: "Cereals containing gluten", value: "Cereals containing gluten"},
                {label: "Crustaceans", value: "Crustaceans"},
                {label: "Eggs", value: "Eggs"},
                {label: "Fish", value: "Fish"},
                {label: "Lupin", value: "Lupin"},
                {label: "Milk", value: "Milk"},
                {label: "Molluscs", value: "Molluscs"},
                {label: "Mustard", value: "Mustard"},
                {label: "Nuts", value: "Nuts"},
                {label: "Peanuts", value: "Peanuts"},
                {label: "Sesame seeds", value: "Sesame seeds"},
                {label: "Soya", value: "Soya"},
                {label: "Sulphur dioxide(sulphites)", value: "Sulphur dioxide(sulphites)"},

            ]} value={allergies} onChange={setAllergies} mb={30} required />
    
            <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
            <button
                    onClick={() => {setStep(4)}}
                  className="inline-flex justify-center items-center py-3 px-5 text-base font-bold text-center text-white rounded-full border border-white hover:border-orange-600 hover:bg-orange-600 focus:ring-4 focus:ring-gray-400 bg-transparent"
                >
                  Previous
                </button>

                <button
                disabled={allergies.length === 0}
                onClick={() => {setStep(6)}}
                  className="inline-flex justify-center items-center py-3 px-5 text-base font-bold text-center text-white rounded-full border border-orange-600 bg-orange-600 focus:ring-4 focus:ring-gray-400"
                >
                  Continue
                </button>
              </div>
        </div>
        )
    }

    const DietForm = () => {
        return (
            <div className="video-content space-y-2">
            <h1 className="font-bold text-2xl lg:text-4xl pb-5">
            What is your diet?
            </h1>
            <h3 className="font-light text-2xl pb-10">
            Understanding your diet helps us tailor your experience. Please select your diet from the options below:
            </h3>

            <Select data={[
                {label: "Vegetarian", value: "Vegetarian"},
                {label: "Vegan", value: "Vegan"},
                {label: "Pescatarian", value: "Pescatarian"},
                {label: "Ketogenic", value: "Ketogenic"},
                {label: "Gluten-free", value: "Gluten-free"},
                {label: "Diary-free", value: "Diary-free"},
                {label: "No preference", value: "No preference"}
            ]} value={diet} onChange={(val) => {setDiet(val)}} mb={30} required />
    
            <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
            <button
                    onClick={() => {setStep(5)}}
                  className="inline-flex justify-center items-center py-3 px-5 text-base font-bold text-center text-white rounded-full border border-white hover:border-orange-600 hover:bg-orange-600 focus:ring-4 focus:ring-gray-400 bg-transparent"
                >
                  Previous
                </button>

                <button
                disabled={diet.trim().length === 0}
                onClick={() => {setStep(7)}}
                  className="inline-flex justify-center items-center py-3 px-5 text-base font-bold text-center text-white rounded-full border border-orange-600 bg-orange-600 focus:ring-4 focus:ring-gray-400"
                >
                  Continue
                </button>
              </div>
        </div>
        )
    }

    const CalorieConsumptionForm = () => {
        return (
            <div className="video-content space-y-2">
            <h1 className="font-bold text-2xl lg:text-4xl pb-5">
            What is your actual calorie consumption per day?
            </h1>
            <h3 className="font-light text-2xl pb-10">
            Understanding your actual daily calorie consumption helps us tailor your experience. Please specify your actual calorie consumption per day:
            </h3>

            <Slider labelAlwaysOn label={(value) => `${value} cal`} mb={30} value={daily_actual_calorie_consumption} onChange={setDailyActualCalorieConsumption} min={0} max={5000} />
    
            <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
            <button
                    onClick={() => {setStep(6)}}
                  className="inline-flex justify-center items-center py-3 px-5 text-base font-bold text-center text-white rounded-full border border-white hover:border-orange-600 hover:bg-orange-600 focus:ring-4 focus:ring-gray-400 bg-transparent"
                >
                  Previous
                </button>

                <button
                onClick={() => {setStep(8)}}
                  className="inline-flex justify-center items-center py-3 px-5 text-base font-bold text-center text-white rounded-full border border-orange-600 bg-orange-600 focus:ring-4 focus:ring-gray-400"
                >
                  Continue
                </button>
              </div>
        </div>
        )
    }

    const ProjectedCalorieForm = () => {
        return (
            <div className="video-content space-y-2">
            <h1 className="font-bold text-2xl lg:text-4xl pb-5">
            What is your projected Calorie Limit per day?
            </h1>
            <h3 className="font-light text-2xl pb-10">
            Understanding your projected Calorie limit per day helps us tailor your experience. Please specify your projected Calorie limit per day:
            </h3>

            <Slider labelAlwaysOn label={(value) => `${value} cal`} mb={30} value={daily_projected_calorie_limit} onChange={setDailyProjectedCalorieLimit} min={0} max={5000} />
    
            <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
            <button
                    onClick={() => {setStep(7)}}
                  className="inline-flex justify-center items-center py-3 px-5 text-base font-bold text-center text-white rounded-full border border-white hover:border-orange-600 hover:bg-orange-600 focus:ring-4 focus:ring-gray-400 bg-transparent"
                >
                  Previous
                </button>

                <button
                onClick={() => {setStep(9)}}
                  className="inline-flex justify-center items-center py-3 px-5 text-base font-bold text-center text-white rounded-full border border-orange-600 bg-orange-600 focus:ring-4 focus:ring-gray-400"
                >
                  Continue
                </button>
              </div>
        </div>
        )
    }

    const SaltLimitForm = () => {
        return (
            <div className="video-content space-y-2">
            <h1 className="font-bold text-2xl lg:text-4xl pb-5">
            What is your salt limit per meal?
            </h1>
            <h3 className="font-light text-2xl pb-10">
            Understanding your salt limit per meal helps us tailor your experience. Please specify your salt limit per day:
            </h3>

            <Slider labelAlwaysOn label={(value) => `${value} mg`} mb={30} value={salt_limit_per_meal} onChange={setSaltLimitPerMeal} min={0} max={600} />
    
            <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
            <button
                    onClick={() => {setStep(8)}}
                  className="inline-flex justify-center items-center py-3 px-5 text-base font-bold text-center text-white rounded-full border border-white hover:border-orange-600 hover:bg-orange-600 focus:ring-4 focus:ring-gray-400 bg-transparent"
                >
                  Previous
                </button>

                <button
                onClick={() => {setStep(10)}}
                  className="inline-flex justify-center items-center py-3 px-5 text-base font-bold text-center text-white rounded-full border border-orange-600 bg-orange-600 focus:ring-4 focus:ring-gray-400"
                >
                  Continue
                </button>
              </div>
        </div>
        )
    }

    const SpiceLimitForm = () => {
        const marks = [
            { value: 1, label: 'Very Mild' },
            { value: 10, label: 'Extremely Hot' },
        ];
          
        return (
            <div className="video-content space-y-2">
            <h1 className="font-bold text-2xl lg:text-4xl pb-5">
            What is your spice limit per meal?
            </h1>
            <h3 className="font-light text-2xl pb-10">
            Understanding your salt limit per meal helps us tailor your experience. Please specify your salt limit per day:
            </h3>

            <Slider marks={marks} labelAlwaysOn mb={30} value={spice_limit} onChange={setSpiceLimit} min={1} max={10} />
    
            <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
            <button
                    onClick={() => {setStep(10)}}
                  className="inline-flex justify-center items-center py-3 px-5 text-base font-bold text-center text-white rounded-full border border-white hover:border-orange-600 hover:bg-orange-600 focus:ring-4 focus:ring-gray-400 bg-transparent"
                >
                  Previous
                </button>

                <button
                onClick={() => {setStep(12)}}
                  className="inline-flex justify-center items-center py-3 px-5 text-base font-bold text-center text-white rounded-full border border-orange-600 bg-orange-600 focus:ring-4 focus:ring-gray-400"
                >
                  Continue
                </button>
              </div>
        </div>
        )
    }

    const SugarLimitForm = () => {
        return (
            <div className="video-content space-y-2">
            <h1 className="font-bold text-2xl lg:text-4xl pb-5">
            What is your sugar limit per meal?
            </h1>
            <h3 className="font-light text-2xl pb-10">
            Understanding your sugar limit per meal helps us tailor your experience. Please specify your sugar limit per day:
            </h3>

            <Slider labelAlwaysOn label={(value) => `${value} mg`} mb={30} value={sugar_limit_per_meal} onChange={setSugarLimitPerMeal} min={0} max={600} />
    
            <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
            <button
                    onClick={() => {setStep(9)}}
                  className="inline-flex justify-center items-center py-3 px-5 text-base font-bold text-center text-white rounded-full border border-white hover:border-orange-600 hover:bg-orange-600 focus:ring-4 focus:ring-gray-400 bg-transparent"
                >
                  Previous
                </button>

                <button
                onClick={() => {setStep(11)}}
                  className="inline-flex justify-center items-center py-3 px-5 text-base font-bold text-center text-white rounded-full border border-orange-600 bg-orange-600 focus:ring-4 focus:ring-gray-400"
                >
                  Continue
                </button>
              </div>
        </div>
        )
    }

    const CuisineForm = () => {
        return (
            <div className="video-content space-y-2">
            <h1 className="font-bold text-2xl lg:text-4xl pb-5">
            What is your cuisine influence?
            </h1>
            <h3 className="font-light text-2xl pb-10">
            Understanding your cuisine influence helps us tailor your experience. Please select your cuisine influence from the options below:
            </h3>

            <MultiSelect data={[
                {label: "Indian", value: "Indian"},
                {label: "Chinese", value: "Chinese"},
                {label: "Western European", value: "Western European"},
                {label: "Eastern European", value: "Eastern European"},
                {label: "North American", value: "North American"},
                {label: "Latin American", value: "Latin American"},
                {label: "Carribean", value: "Carribean"},
                {label: "Japanese", value: "Japanese"},
                {label: "Mediterranean", value: "Mediterranean"},
                {label: "Arabic", value: "Arabic"},
                {label: "Thai", value: "Thai"},
                {label: "Singaporean", value: "Singaporean"},
                {label: "West African", value: "West African"},
                {label: "East African", value: "East African"},

            ]} value={cuisine_influence} onChange={setCuisineInfluence} mb={30} required />
    
            <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
            <button
                    onClick={() => {setStep(11)}}
                  className="inline-flex justify-center items-center py-3 px-5 text-base font-bold text-center text-white rounded-full border border-white hover:border-orange-600 hover:bg-orange-600 focus:ring-4 focus:ring-gray-400 bg-transparent"
                >
                  Previous
                </button>

                <button
                disabled={cuisine_influence.length === 0}
                onClick={() => {setStep(13)}}
                  className="inline-flex justify-center items-center py-3 px-5 text-base font-bold text-center text-white rounded-full border border-orange-600 bg-orange-600 focus:ring-4 focus:ring-gray-400"
                >
                  Continue
                </button>
              </div>
        </div>
        )
    }

    const FoodPreferenceForm = () => {
        return (
            <div className="video-content space-y-2">
            <h1 className="font-bold text-2xl lg:text-4xl pb-5">
            What is your food preferences?
            </h1>
            <h3 className="font-light text-2xl pb-10">
            Understanding your food preferences helps us tailor your experience. Please select your food preferences from the options below:
            </h3>

            <MultiSelect data={[
                {label: "Lean proteins", value: "Lean proteins"},
                {label: "Complex Carbohydrates", value: "Complex Carbohydrates"},
                {label: "Healthy Fats", value: "Healthy Fats"},
                {label: "Dairy and alternatives", value: "Dairy and alternatives"},
                {label: "Simple Carbohydrates", value: "Simple Carbohydrates"},
                {label: "Green Vegetables", value: "Green Vegetables"},
                {label: "Legumes and Beans", value: "Legumes and Beans"},
                {label: "Whole Foods", value: "Whole Foods"},
                {label: "Balanced Micronutrients", value: "Balanced Micronutrients"},
                {label: "High Fibre Foods", value: "High Fibre Foods"},
                {label: "High Protein Foods", value: "High Protein Foods"},

            ]} value={food_preferences} onChange={setFoodPreferences} mb={30} required />
    
            <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
            <button
                    onClick={() => {setStep(12)}}
                  className="inline-flex justify-center items-center py-3 px-5 text-base font-bold text-center text-white rounded-full border border-white hover:border-orange-600 hover:bg-orange-600 focus:ring-4 focus:ring-gray-400 bg-transparent"
                >
                  Previous
                </button>

                <button
                disabled={food_preferences.length === 0}
                onClick={() => {setStep(14)}}
                  className="inline-flex justify-center items-center py-3 px-5 text-base font-bold text-center text-white rounded-full border border-orange-600 bg-orange-600 focus:ring-4 focus:ring-gray-400"
                >
                  Continue
                </button>
              </div>
        </div>
        )
    }

    const NumberMealsForm = () => {
        return (
            <div className="video-content space-y-2">
            <h1 className="font-bold text-2xl lg:text-4xl pb-5">
            What is your number of meals per day?
            </h1>
            <h3 className="font-light text-2xl pb-10">
            Understanding your number of meals per day helps us tailor your experience. Please specify your number of meals per day:
            </h3>

            <Slider labelAlwaysOn label={(value) => `${value}`} mb={30} value={number_of_meals_per_day} onChange={setNumberOfMealsPerDay} min={1} max={7} />
    
            <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
            <button
                    onClick={() => {setStep(13)}}
                  className="inline-flex justify-center items-center py-3 px-5 text-base font-bold text-center text-white rounded-full border border-white hover:border-orange-600 hover:bg-orange-600 focus:ring-4 focus:ring-gray-400 bg-transparent"
                >
                  Previous
                </button>

                <button
                onClick={() => {setStep(15)}}
                  className="inline-flex justify-center items-center py-3 px-5 text-base font-bold text-center text-white rounded-full border border-orange-600 bg-orange-600 focus:ring-4 focus:ring-gray-400"
                >
                  Continue
                </button>
              </div>
        </div>
        )
    }

    const HealthGoalsForm = () => {
        return (
            <div className="video-content space-y-2">
            <h1 className="font-bold text-2xl lg:text-4xl pb-5">
            What are your health goals?
            </h1>
            <h3 className="font-light text-2xl pb-10">
            Understanding your health goals helps us tailor your experience. Please select your health goals from the options below:
            </h3>

            <MultiSelect data={[
                {label: "Weight Loss", value: "Weight Loss"},
                {label: "Weight Gain", value: "Weight Gain"},
                {label: "Maintain Weight", value: "Maintain Weight"},
                {label: "Muscle Building", value: "Muscle Building"},

            ]} value={health_goals} onChange={setHealthGoals} mb={30} required />

            <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
            <button
                    onClick={() => {setStep(14)}}
                  className="inline-flex justify-center items-center py-3 px-5 text-base font-bold text-center text-white rounded-full border border-white hover:border-orange-600 hover:bg-orange-600 focus:ring-4 focus:ring-gray-400 bg-transparent"
                >
                  Previous
                </button>

                <button
                disabled={health_goals.length === 0}
                onClick={() => {setStep(16)}}
                  className="inline-flex justify-center items-center py-3 px-5 text-base font-bold text-center text-white rounded-full border border-orange-600 bg-orange-600 focus:ring-4 focus:ring-gray-400"
                >
                  Continue
                </button>
              </div>

            </div>
        )
    }

    const ActivityLevelForm = () => {
        const marks = [
            { value: 1, label: 'Not active at all' },
            { value: 10, label: 'Professional athlete' },
        ]
        return (
            <div className="video-content space-y-2">
            <h1 className="font-bold text-2xl lg:text-4xl pb-5">
            What is your activity level?
            </h1>
            <h3 className="font-light text-2xl pb-10">
            Understanding your activity level helps us tailor your experience. Please specify your activity level:
            </h3>

            <Slider marks={marks} labelAlwaysOn label={(value) => `${value} `} mb={30} value={activity_level} onChange={setActivityLevel} min={1} max={10} />
    
            <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
            <button
                    onClick={() => {setStep(15)}}
                  className="inline-flex justify-center items-center py-3 px-5 text-base font-bold text-center text-white rounded-full border border-white hover:border-orange-600 hover:bg-orange-600 focus:ring-4 focus:ring-gray-400 bg-transparent"
                >
                  Previous
                </button>

                <button
                onClick={() => {setStep(17)}}
                  className="inline-flex justify-center items-center py-3 px-5 text-base font-bold text-center text-white rounded-full border border-orange-600 bg-orange-600 focus:ring-4 focus:ring-gray-400"
                >
                  Continue
                </button>
              </div>
        </div>
        )
    }

    const ActivityTypeForm = () => {
        const marks = [
            { value: 1, label: 'Flexibility' },
            { value: 5, label: 'Aerobic' },
            { value: 10, label: 'Muscle Strengthening' },
        ]

        return (
            <div className="video-content space-y-2">
            <h1 className="font-bold text-2xl lg:text-4xl pb-5">
            What is the type of activity?
            </h1>
            <h3 className="font-light text-2xl pb-10">
            Understanding your type of activity helps us tailor your experience. Please specify your type of activity:
            </h3>

            <Slider marks={marks} labelAlwaysOn label={(value) => `${value} `} mb={30} value={type_of_activity} onChange={setTypeOfActivity} min={1} max={10} />
    
            <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
            <button
                    onClick={() => {setStep(16)}}
                  className="inline-flex justify-center items-center py-3 px-5 text-base font-bold text-center text-white rounded-full border border-white hover:border-orange-600 hover:bg-orange-600 focus:ring-4 focus:ring-gray-400 bg-transparent"
                >
                  Previous
                </button>

                <button
                onClick={() => {setStep(18)}}
                  className="inline-flex justify-center items-center py-3 px-5 text-base font-bold text-center text-white rounded-full border border-orange-600 bg-orange-600 focus:ring-4 focus:ring-gray-400"
                >
                  Continue
                </button>
              </div>
        </div>
        )
    }

    const WorkoutTimePerDayForm = () => {
        return (
            <div className="video-content space-y-2">
            <h1 className="font-bold text-2xl lg:text-4xl pb-5">
            What is your workout time per day?
            </h1>
            <h3 className="font-light text-2xl pb-10">
            Understanding your workout time per day helps us tailor your experience. Please specify your workout time per day:
            </h3>

            <Slider labelAlwaysOn label={(value) => `${value} `} mb={30} value={workout_time_per_day} onChange={setWorkoutTimePerDay} min={1} max={10} />
    
            <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
            <button
                    onClick={() => {setStep(17)}}
                  className="inline-flex justify-center items-center py-3 px-5 text-base font-bold text-center text-white rounded-full border border-white hover:border-orange-600 hover:bg-orange-600 focus:ring-4 focus:ring-gray-400 bg-transparent"
                >
                  Previous
                </button>

                <button
                onClick={() => {setStep(19)}}
                  className="inline-flex justify-center items-center py-3 px-5 text-base font-bold text-center text-white rounded-full border border-orange-600 bg-orange-600 focus:ring-4 focus:ring-gray-400"
                >
                  Continue
                </button>
              </div>
        </div>
        )
    }

    const WorkoutQuantityPerWeekForm = () => {
        return (
            <div className="video-content space-y-2">
            <h1 className="font-bold text-2xl lg:text-4xl pb-5">
            What is your workout quantity per week?
            </h1>
            <h3 className="font-light text-2xl pb-10">
            Understanding your workout quantity per week helps us tailor your experience. Please specify your workout quantity per week:
            </h3>

            <Slider labelAlwaysOn label={(value) => `${value} `} mb={30} value={workout_quantity_per_week} onChange={setWorkoutQuantityPerWeek} min={1} max={10} />
    
            <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
            <button
                    onClick={() => {setStep(18)}}
                  className="inline-flex justify-center items-center py-3 px-5 text-base font-bold text-center text-white rounded-full border border-white hover:border-orange-600 hover:bg-orange-600 focus:ring-4 focus:ring-gray-400 bg-transparent"
                >
                  Previous
                </button>

                <button
                onClick={() => {setStep(20)}}
                  className="inline-flex justify-center items-center py-3 px-5 text-base font-bold text-center text-white rounded-full border border-orange-600 bg-orange-600 focus:ring-4 focus:ring-gray-400"
                >
                  Continue
                </button>
              </div>
        </div>
        )
    }

    const NumberOfPlans = () => {
        return (
            <div className="video-content space-y-2">
                {error.with_error ? (
                    <Notification color="red" title="Bummer!">
                        {error.error}
                  </Notification>
                ) : null}
            <h1 className="font-bold text-2xl lg:text-4xl pb-5">
                How many meal plans do you want to receive?
            </h1>
            <h3 className="font-light text-2xl pb-10">
            Understanding your workout quantity per week helps us tailor your experience. Please specify your workout qunatity per week:
            </h3>

            <Select data={[
                {label: "1 Day", value: "1 Day"},
                {label: "7 Days", value: "7 Days"}
            ]} value={plans} onChange={(val) => {setPlans(val)}} mb={30} />

            <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
            <button
                    onClick={() => {setStep(19)}}
                  className="inline-flex justify-center items-center py-3 px-5 text-base font-bold text-center text-white rounded-full border border-white hover:border-orange-600 hover:bg-orange-600 focus:ring-4 focus:ring-gray-400 bg-transparent"
                >
                  Previous
                </button>

                <button
                disabled={plans.trim().length === 0}
                onClick={() => {createMealPlan()}}
                  className="inline-flex justify-center items-center py-3 px-5 text-base font-bold text-center text-white rounded-full border border-orange-600 bg-orange-600 focus:ring-4 focus:ring-gray-400"
                >
                  Create Meal Plan
                </button>
              </div>
            </div>
        )
    }

    return (
        <>
        {step > 0 ? (
                <div className="w-full bg-gray-200 rounded-full h-1.5 bg-white">
                <div className="bg-blue-600 h-1.5 rounded-full dark:bg-blue-500" style={{width: `${(step / 20) * 100}%`}}></div>
              </div>
        ) : null}
        <section className="relative h-[calc(100vh-77px)] bg-gray-950 flex flex-col items-center justify-center text-center text-white py-0 px-3 overflow-auto">
            {loading ? (
                <div role="status">
                <svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                </svg>
                <span class="sr-only">Loading...</span>
            </div>
            ) : !loading && meal_plan.trim().length === 0 ? (
                <>
                            {step === 0 ? (
                <Welcome />
            ) : step === 1 ? (
                <AgeForm />
            ) : step === 2 ? (
                <GenderForm />
            ) : step === 3 ? (
                <WeightForm />
            ) : step === 4 ? (
                <BloodTypeForm />
            ) : step === 5 ? (
                <AllergiesForm />
            ) : step === 6 ? (
                <DietForm />
            ) : step === 7 ? (
                <CalorieConsumptionForm />
            ) : step === 8 ? (
                <ProjectedCalorieForm />
            ) : step === 9 ? (
                <SaltLimitForm />
            ) : step === 10 ? (
                <SugarLimitForm />
            ) : step === 11 ? (
                <SpiceLimitForm />
            ) : step === 12 ? (
                <CuisineForm />
            ) : step === 13 ? (
                <FoodPreferenceForm />
            ) : step === 14 ? (
                <NumberMealsForm />
            ) : step === 15 ? (
                <HealthGoalsForm />
            ) : step === 16 ? (
                <ActivityLevelForm />
            ) : step === 17 ? (
                <ActivityTypeForm />
            ) : step === 18 ? (
                <WorkoutTimePerDayForm />
            ) : step === 19 ? (
                <WorkoutQuantityPerWeekForm />
            ) :  (
                <NumberOfPlans />
            )}
                </>
            ) : (
                   <div className='mt-20 mb-20' dangerouslySetInnerHTML={{ __html: meal_plan }} />
            )}
</section>
</>
    )
}
  

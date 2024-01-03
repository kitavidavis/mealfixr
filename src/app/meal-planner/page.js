import { Footer } from "@/components/footer";
import Header from "@/components/header";
import MealPlannerForm from "@/components/mealplannerform";

export const metadata = {
    title: 'Personalized Meal Plans for Every Goal & Diet: AI-Powered by MealFixr',
    description: "Ditch mealtime dilemmas! MealFixr crafts personalized meal plans, tailored to your preferences, nutritional goals, and even what's already in your fridge. Enjoy delicious, healthy meals with ease. Get started today!",
  }

export default function MealPlanner(){
    return (
        <>
        <Header />
        <MealPlannerForm />
        <Footer />
        </>
    )
}
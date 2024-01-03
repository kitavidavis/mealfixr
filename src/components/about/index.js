import Link from 'next/link';
import React from 'react'

const About = () => {
    return (
        <section className="bg-gray-950">
    <div className="gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6">
        <div className=" sm:text-lg text-white">
            <h2 className="mb-4 text-4xl tracking-tight font-bold text-white">About MealFixr</h2>
            <p className="mb-4 text-lg font-light text-white lg:text-xl py-5">
            Meal Fixr is an AI-powered meal planning app that simplifies the process of creating healthy meal plans. The web app can consider a user's dietary preferences, nutritional goals, and available ingredients to generate optimised meal plans. It can also offer recipe suggestions, track calorie intake, and provide grocery lists for efficient meal preparation.
            </p>

            <div className="mt-5 space-y-4 sm:space-y-0 sm:space-x-4">
        <Link
              href="/meal-planner"
              className=" text-gray-900 items-center py-3 px-5 text-base font-medium text-center rounded-lg border border-white bg-gray-100 focus:ring-4 focus:ring-gray-400"
            >
              Learn More <span className="ml-2">&rarr;</span>
            </Link>
        </div>
        </div>
        <div className="grid grid-cols-1 gap-4 mt-8">
            <img className="w-full rounded-lg" src="./images/84.png" alt="Office" />
        </div>
    </div>
</section>
    )
}

export default About;
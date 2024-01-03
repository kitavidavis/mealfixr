export function Footer(){
    return (
<footer className="bottom-0 left-0 z-20 w-full p-4 border-t shadow md:flex md:items-center md:justify-between md:p-6 bg-gray-950 border-gray-600">
    <span className="text-sm sm:text-center text-gray-200">© {new Date().getFullYear()} <a href="/" className="hover:underline">Meal Fxr Ltd</a>. All Rights Reserved.
    </span>
    <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-200 sm:mt-0">
        <li>
            <a href="#" className="mr-4 hover:underline md:mr-6">Privacy Policy</a>
        </li>
        <li>
            <a href="#" className="mr-4 hover:underline md:mr-6">Terms & Conditions</a>
        </li>
        <li>
            <a href="#" className="mr-4 hover:underline md:mr-6">Cookies Policy</a>
        </li>
        <li>
            <a href="#" className="hover:underline">Contact</a>
        </li>
    </ul>
</footer>

    )
}
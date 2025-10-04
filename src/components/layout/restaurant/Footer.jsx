export default function Footer() {
  return (
    <footer className="bg-white shadow-md p-4 text-center mt-auto">
      <p className="text-gray-600 text-sm">
        © {new Date().getFullYear()} MyRestaurant. All Rights Reserved.
      </p>
    </footer>
  );
}

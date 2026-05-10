export default function App() {
  const places = [
    {
      title: "Paris",
      image:
        "https://images.unsplash.com/photo-1502602898657-3e91760cbb34",
    },
    {
      title: "Maldives",
      image:
        "https://images.unsplash.com/photo-1514282401047-d79a71a590e8",
    },
    {
      title: "Dubai",
      image:
        "https://images.unsplash.com/photo-1512453979798-5ea266f8880c",
    },
  ]

  return (
    <div className="container">
      <nav className="navbar">
        <h1>Travora</h1>

        <div className="links">
          <a href="#">Home</a>
          <a href="#">Destinations</a>
          <a href="#">Packages</a>
          <a href="#">Contact</a>
        </div>
      </nav>

      <section className="hero">
        <h2>Explore The World With Travora</h2>

        <p>
          Discover beautiful destinations and unforgettable journeys.
        </p>

        <button>Start Journey</button>
      </section>

      <section className="destinations">
        <h2>Popular Destinations</h2>

        <div className="cards">
          {places.map((place, index) => (
            <div className="card" key={index}>
              <img src={place.image} alt={place.title} />

              <h3>{place.title}</h3>

              <p>Experience luxury travel and unforgettable moments.</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="footer">
        <p>© 2026 Travora. All rights reserved.</p>
      </footer>
    </div>
  )
}
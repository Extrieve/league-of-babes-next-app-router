export const Home = () => {
  return (
    <div className="home">
      <h1>
        League of Babes
      </h1>
      <p className="home-description">
        Find out whos your favorite Babe across Summoners Rift 😳
      </p>
      <div className='go'>
        <a href="/match">
          <button className="home-button">
            Find your Babe
          </button>
        </a>
        <a href="/champions">
          <button className="home-button">
            Explore Babes
          </button>
        </a>
      </div>
    </div>
  );
}
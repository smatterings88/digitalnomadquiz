import logo from '../assets/logo.png';

export function Nav() {
  return (
    <nav>
      <a href="https://pridenomad.com" className="logo" aria-label="PrideNomad">
        <img src={logo} alt="PrideNomad" height={34} style={{ display: 'block' }} />
      </a>
      <a href="https://pridenomad.com/newsletter" className="nav-cta">
        Free Newsletter
      </a>
    </nav>
  );
}

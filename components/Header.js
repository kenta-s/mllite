import Link from 'next/link';

const linkStyle = {
  marginRight: 15
};

const Header = () => (
  <div>
    <Link href="/">
      <a style={linkStyle}>Home</a>
    </Link>
    <Link href="/ml_models">
      <a style={linkStyle}>ml_models</a>
    </Link>
  </div>
);

export default Header;

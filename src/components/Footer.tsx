import reactLogo from '../assets/react.svg';
import viteLogo from '../assets/vite.svg';
import '../styles/Footer.css';

const Footer = () => {
	return (
		<div className="footer">
			<p>Built with Vite and React
				<a href="https://vite.dev" target="_blank" rel="noreferrer noopener">
					<img src={viteLogo} className="logo" alt="Vite logo" />
				</a>
				<a href="https://react.dev" target="_blank" rel="noreferrer noopener">
					<img src={reactLogo} className="logo react" alt="React logo" />
				</a>
			</p>
		</div>
	)
}

export default Footer;

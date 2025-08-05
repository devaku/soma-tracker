import { AuthContextProvider } from '../lib/context/auth_context.js';
import './globals.css';

export default function Layout({ children }) {
	return (
		<html lang="en">
			<body>
				<AuthContextProvider>{children}</AuthContextProvider>
			</body>
		</html>
	);
}

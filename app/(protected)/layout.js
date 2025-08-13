import Sidebar from '@/components/layout/sidebar';

export default function ProtectedLayout({ children }) {
	return <Sidebar>{children}</Sidebar>;
}

import { Outlet } from 'react-router-dom';
import Navigation from './Navigation';
import Footer from './Footer';
import AnimatedBackground from '../AnimatedBackground';

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col relative">
      <AnimatedBackground />
      <Navigation />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

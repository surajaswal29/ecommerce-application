import MainLayout from '@/layouts/MainLayout';

interface IProps {
  children: React.ReactNode;
}

export default function HomeLayout({ children }: IProps) {
  return <MainLayout>{children}</MainLayout>;
}

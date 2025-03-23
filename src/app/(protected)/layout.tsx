import LogoutButton from "@/components/logout-btn";

export default function Layout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="w-full">
      {children}

      <LogoutButton />
    </div>
  )
}
import Link from "next/link";

type NavItemProps = {
  href: string;
  linkText?: string;
};

export default function NavItem({href, linkText}: NavItemProps) {
  return (
    <li>
      <Link href={href}>
        <h3 className="">
          {linkText ? linkText : href}
        </h3>
      </Link>
    </li>
  );
}
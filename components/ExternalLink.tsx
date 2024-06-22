import { type ComponentProps } from "react";

import { Link } from "expo-router";

import { openLink } from "@/helpers/open-link";

type Props = Omit<ComponentProps<typeof Link>, "href"> & { href: string };

export function ExternalLink({ href, ...rest }: Props) {
  return (
    <Link
      target="_blank"
      {...rest}
      href={href}
      onPress={(e) => {
        e.preventDefault();
        openLink(href);
      }}
    />
  );
}

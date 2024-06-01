import { StyleSheet } from "react-native";

import { Collapsible } from "@/components/Collapsible";
import { ExternalLink } from "@/components/ExternalLink";
import { HeaderImage } from "@/components/HeaderImage";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

const districtContacts = [
  {
    title: "DCMC (Chair)",
    email: "chair@sfgeneralservice.org",
  },
  {
    title: "Alt. Chair",
    email: "alt.chair@sfgeneralservice.org",
  },
  {
    title: "Mail Coordinator",
    email: "mail@sfgeneralservice.org",
  },
  {
    title: "Recording Secretary",
    email: "mail@sfgeneralservice.org",
  },
  {
    title: "Registrar",
    email: "registrar@sfgeneralservice.org",
  },
  {
    title: "Treasurer",
    email: "treasurer@sfgeneralservice.org",
  },
  {
    title: "Events",
    email: "events@sfgeneralservice.org",
  },
  {
    title: "Literature",
    email: "literature@sfgeneralservice.org",
  },
  {
    title: "Grapevine Representative",
    email: "gvr@sfgeneralservice.org",
  },
  {
    title: "General Inquiries",
    email: "info@sfgeneralservice.org",
  },
];

const areaContacts = [
  {
    title: "Pacific Region Trustee",
    email: "trustee@cnca06.org",
  },
  {
    title: "Accessibilities Chair",
    email: "accessibilities@cnca06.org",
  },
  {
    title: "Alt Delegate",
    email: "alt-delegate@cnca06.org",
  },
  {
    title: "Archives Chair",
    email: "archives@cnca06.org",
  },
  {
    title: "Assembly Coordinator",
    email: "assemblies@cnca06.org",
  },
  {
    title: "Bridging The Gap Chair",
    email: "btg@cnca06.org",
  },
  {
    title: "CNCA Area Chair",
    email: "chair@cnca06.org",
  },
  {
    title: "CNCA Comments Advisor",
    email: "comments-advisor@cnca06.org",
  },
  {
    title: "CNCA Comments",
    email: "comments@cnca06.org",
  },
  {
    title: "CNCA Commentarios Advisor",
    email: "commentarios-advisor@cnca06.org",
  },
  {
    title: "CNCA Comentarios",
    email: "commentarios@cnca06.org",
  },
  {
    title: "Delegate",
    email: "delegate@cnca06.org",
  },
  {
    title: "Finance Chair",
    email: "finance@cnca06.org",
  },
  {
    title: "Grapevine Chair",
    email: "grapevine@cnca06.org",
  },
  {
    title: "La Vina Chair",
    email: "la-vina@cnca06.org",
  },
  {
    title: "Literature",
    email: "literature@cnca06.org",
  },
  {
    title: "PI/CPC",
    email: "picpc@cnca06.org",
  },
  {
    title: "Recording Secretary",
    email: "recording@cnca06.org",
  },
  {
    title: "Registrar",
    email: "registrar@cnca06.org",
  },
  {
    title: "Technology Chair",
    email: "tech@cnca06.org",
  },
  {
    title: "Translation Chair",
    email: "translation@cnca06.org",
  },
  {
    title: "Treasurer",
    email: "treasurer@cnca06.org",
  },
  {
    title: "Website Chair",
    email: "website@cnca06.org",
  },
];

const gsoContacts = [
  {
    title: "Group Services",
    email: "group.services@aa.org",
  },
];

const contacts = [
  {
    name: "District 06",
    contacts: districtContacts,
  },
  {
    name: "Area 06",
    contacts: areaContacts,
  },
  {
    name: "GSO",
    contacts: gsoContacts,
  },
];

export default function ContactScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
      headerImage={<HeaderImage />}
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Contact</ThemedText>
      </ThemedView>
      <ThemedText>
        Have a question? The following resources can help:
      </ThemedText>
      {contacts.map((entity, index) => (
        <Collapsible title={entity.name} key={index}>
          {entity.contacts.map((contact, index) => (
            <ThemedView key={index}>
              <ExternalLink href={`mailto:${contact.email}`}>
                <ThemedText type="link">{contact.title}</ThemedText>
              </ExternalLink>
            </ThemedView>
          ))}
        </Collapsible>
      ))}
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
});

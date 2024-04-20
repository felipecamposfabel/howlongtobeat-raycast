import { List } from "@raycast/api";

const platforms = ['All', 'Emulated', 'Mobile', 'Nintendo 3DS', 'Nintendo Switch', 'PC', 'Playstation 3', 'Playstation 4', 'Playstation 5', 'Xbox 360', 'Xbox One', 'Xbox Series X/S']

export default function FilterDropdown(props: { onPlatformChange: (newValue: string) => void }) {
 const { onPlatformChange } = props;
 return (
   <List.Dropdown
     tooltip="Select a Platform"
     storeValue={true}
     onChange={(newValue) => {
      onPlatformChange(newValue);
     }}
   >
     <List.Dropdown.Section title="Platforms">
       {platforms.map((platform) => (
         <List.Dropdown.Item key={platform} title={platform} value={platform} />
       ))}
     </List.Dropdown.Section>
   </List.Dropdown>
 );
}
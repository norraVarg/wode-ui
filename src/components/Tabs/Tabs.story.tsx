import { Tabs } from './Tabs';

export function Default() {
  return (
    <Tabs.Root defaultValue="account">
      <Tabs.List>
        <Tabs.Tab value="account">Account</Tabs.Tab>
        <Tabs.Tab value="password">Password</Tabs.Tab>
        <Tabs.Tab value="settings" disabled>
          Settings
        </Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel value="account">Manage your account details here.</Tabs.Panel>
      <Tabs.Panel value="password">Update your password here.</Tabs.Panel>
      <Tabs.Panel value="settings">Adjust your settings here.</Tabs.Panel>
    </Tabs.Root>
  );
}

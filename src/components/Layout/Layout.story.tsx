import { Layout } from './Layout';

export function Default() {
  return (
    <div className="h-[400px]">
      <Layout
        header={<div className="p-4 font-semibold">Header</div>}
        content={
          <div className="p-4">
            {Array.from({ length: 30 }, (_, i) => (
              <p key={i}>Content row {i + 1}</p>
            ))}
          </div>
        }
        footer={<div className="p-4 text-sm">Footer</div>}
      />
    </div>
  );
}

import { usePage } from "@inertiajs/react";

const EditorLayout = ({ children }) => {
  const { props} = usePage();
  console.log(props);
  
  return (
    <>
      <main className="min-h-[800px]">{children}</main>
    </>
  );
};
export default EditorLayout;

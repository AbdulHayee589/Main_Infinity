import { usePage } from "@inertiajs/react";

const EditorLayout = ({ children }) => {
  const { props} = usePage();
  console.log(props);
  
  return (
    <>
      editor
      <main className="min-h-[800px]">{children}</main>
    </>
  );
};
export default EditorLayout;

import AddNewClassDialog from "@/components/create-new-student/classes/AddNewClassDialog";
import { Button } from "@/components/ui/button";

const Classes = () => {
  return (
    <main className="py-5">
      <div className="flex justify-end">
        <AddNewClassDialog>
          <Button className="h-12">Add Class</Button>
        </AddNewClassDialog>
      </div>
    </main>
  );
};

export default Classes;

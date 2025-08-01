import { AddNewSectionDialog } from "@/components/create-new-student/batch-and-section/AddNewSectionDialog";
import { Button } from "@/components/ui/button";

const BatchAndSection = () => {
  return (
    <main className="py-5">
      <div className="flex justify-end">
        <AddNewSectionDialog>
          <Button className="h-12">Add New Section</Button>
        </AddNewSectionDialog>
      </div>
    </main>
  );
};

export default BatchAndSection;

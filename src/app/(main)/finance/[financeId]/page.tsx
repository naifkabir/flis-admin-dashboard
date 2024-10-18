import { GetHeaderById } from "@/lib/actions/finance.action";

export default async function EditFinance({
  params,
}: {
  params: { financeId: string };
}) {
  const { financeId } = params;

  const data = await GetHeaderById(financeId);

  return <div></div>;
}

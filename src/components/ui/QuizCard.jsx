import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function QuizCard({ type, onClick }) {
  return (
    <Card className="cursor-pointer hover:shadow-lg transition-shadow">
      <CardHeader>
        <CardTitle>{type}</CardTitle>
      </CardHeader>
      <CardContent>
        <Button onClick={onClick}>Mulai</Button>
      </CardContent>
    </Card>
  );
}

import {
  Card,
  CardContent,
  Typography,
  Stack,
  Chip
} from "@mui/material";

function InvoiceCard({ invoice }) {
  return (
    <Card
      sx={{
        mb: 2,
        borderRadius: 2,
        boxShadow: 2,
      }}
    >
      <CardContent>
        {/* Invoice ID & Date */}
        <Stack direction="row" justifyContent="space-between" mb={1}>
          <Typography variant="body2" color="text.secondary">
            {invoice.id}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {invoice.date}
          </Typography>
        </Stack>

        {/* Customer Name */}
        <Typography variant="subtitle1" fontWeight={600} mb={1}>
          {invoice.customer}
        </Typography>

        {/* Status & Amount */}
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Chip
            label={invoice.status}
            size="small"
            sx={{
              textTransform: "capitalize",
              bgcolor:
                invoice.status === "paid" ? "#e3f7e8" : "#ffe2e2",
              color:
                invoice.status === "paid" ? "#2e7d32" : "#c62828",
            }}
          />
          <Typography fontWeight={600}>
            ₹{invoice.amount.toFixed(2)}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default InvoiceCard;

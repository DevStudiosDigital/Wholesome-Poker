output "address" {
  description = "The hostname of the RDS instance"
  value       = aws_db_instance.main.address
}

output "endpoint" {
  description = "The connection endpoint in `address:port` format"
  value       = aws_db_instance.main.endpoint
}

output "security_group" {
  description = "ID of the security group associated with the database"
  value       = aws_security_group.main.id
}
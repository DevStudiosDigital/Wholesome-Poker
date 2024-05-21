variable "project_name" {
  description = "Name of the project"
  type        = string
}

variable "environment" {
  description = "Infrastructure environment"
  type        = string
}

variable "engine" {
  description = "The database engine (postgres or mysql)"
  type        = string
  validation {
    condition     = contains(["postgres", "mysql"], var.engine)
    error_message = "Allowed values 'postgres' and 'mysql'."
  }
}

variable "engine_version" {
  description = "The engine version to use"
  type        = string
}

variable "allocated_storage" {
  description = "The allocated storage in gibibytes (GiB)"
  type        = number
  default     = 10
}

variable "max_allocated_storage" {
  description = "The upper limit to which Amazon RDS can automatically scale the storage of the DB (0 to disable storage autoscaling)"
  type        = number
  default     = 0
}

variable "instance_class" {
  description = "The RDS instance class"
  type        = string
  default     = "db.t3.micro"
}

variable "storage_encrypted" {
  description = "Specifies whether the DB instance is encrypted"
  type        = bool
  default     = true
}

variable "skip_final_snapshot" {
  description = "Determines whether a final DB snapshot is created before the DB instance is deleted"
  type        = bool
  default     = true
}

variable "backup_retention_period" {
  description = "The backup retention period"
  type        = number
  default     = 7
}

variable "backup_window" {
  description = "The daily time range (in UTC) during which automated backups are created if they are enabled. Syntax: `hh24:mi-hh24:mi`. Must not overlap with `maintenance_window`."
  type        = string
  default     = "21:44-22:14"
}

variable "maintenance_window" {
  description = "The window to perform maintenance in. Syntax: `ddd:hh24:mi-ddd:hh24:mi`"
  type        = string
  default     = "mon:00:26-mon:00:56"
}

variable "db_name" {
  description = "The database name"
  type        = string
  sensitive   = true
}

variable "db_username" {
  description = "The master username for the database"
  type        = string
}

variable "db_password" {
  description = "Password for the master DB user"
  type        = string
  sensitive   = true
}

variable "vpc_id" {
  description = "ID of the target VPC"
  type        = string
}

variable "subnet_ids" {
  description = "Subnet IDs inside the target VPC"
  type        = list(string)
}

variable "multi_az" {
  description = "If the RDS instance is multi AZ enabled"
  type        = bool
  default     = false
}

variable "publicly_accessible" {
  description = "Bool to control if instance is publicly accessible"
  type        = bool
  default     = false
}

variable "ingress_rds_sg" {
  description = "List of the database ingress ports to open"
  type = list(object({
    port            = number
    protocol        = string
    cidr_blocks     = list(string)
    security_groups = list(string)
  }))
}
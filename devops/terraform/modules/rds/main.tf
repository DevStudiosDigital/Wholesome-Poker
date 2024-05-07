locals {
  identifier = "${var.environment}-${var.project_name}-${var.engine}"
}

resource "aws_db_subnet_group" "main" {
  name       = "${local.identifier}-subnet-group"
  subnet_ids = var.subnet_ids

  tags = {
    Name = "${local.identifier}-subnet-group"
  }
}

resource "aws_security_group" "main" {
  name        = "${local.identifier}-allow-traffic"
  description = "Allows access to the ${var.environment} ${var.engine} database"
  vpc_id      = var.vpc_id


  dynamic "ingress" {
    for_each = var.ingress_rds_sg

    content {
      from_port       = lookup(ingress.value, "port", "5432")
      to_port         = lookup(ingress.value, "port", "5432")
      protocol        = lookup(ingress.value, "protocol", "tcp")
      cidr_blocks     = lookup(ingress.value, "cidr_blocks", null)
      security_groups = lookup(ingress.value, "security_groups", null)
    }
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "${local.identifier}-allow-traffic"
  }

  lifecycle {
    ignore_changes = [
      name, description
    ]
  }
}

resource "aws_db_instance" "main" {
  allocated_storage       = var.allocated_storage
  backup_retention_period = var.backup_retention_period
  backup_window           = var.backup_window
  db_name                 = var.db_name
  db_subnet_group_name    = aws_db_subnet_group.main.id
  engine                  = var.engine
  engine_version          = var.engine_version
  identifier              = local.identifier
  instance_class          = var.instance_class
  maintenance_window      = var.maintenance_window
  max_allocated_storage   = var.max_allocated_storage
  multi_az                = var.multi_az
  password                = var.db_password
  publicly_accessible     = var.publicly_accessible
  skip_final_snapshot     = var.skip_final_snapshot
  storage_encrypted       = var.storage_encrypted
  username                = var.db_username
  vpc_security_group_ids  = [aws_security_group.main.id]

  tags = {
    Name = local.identifier
  }
}
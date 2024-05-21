resource "aws_s3_bucket" "public_files_bucket" {
  bucket = "${var.environment}-${module.globals.project_name}-public-files"
}

resource "aws_s3_bucket_public_access_block" "main" {
  bucket = aws_s3_bucket.public_files_bucket.id

  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false
}

resource "aws_s3_bucket_policy" "main" {
  bucket = aws_s3_bucket.public_files_bucket.bucket
  policy = <<POLICY
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": [
                "s3:GetObject"
            ],
            "Resource": [
                "${aws_s3_bucket.public_files_bucket.arn}/*"
            ]
        }
    ]
}
POLICY
}

resource "aws_s3_bucket_cors_configuration" "main" {
  bucket = aws_s3_bucket.public_files_bucket.bucket

  cors_rule {
    allowed_headers = ["*"]
    allowed_methods = [
        "HEAD",
        "GET"
      ]
    allowed_origins = ["*"]
    max_age_seconds = 3000
  }
}
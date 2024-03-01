from django.db import models

class Download(models.Model):
    title = models.CharField(max_length=255)
    download_date = models.DateField()
    file_type = models.CharField(max_length=50)
    file_size = models.IntegerField()  # Size in bytes
    file_url = models.URLField()
    thumbnail_url = models.URLField(null=True, blank=True)

    def __str__(self):
        return self.title

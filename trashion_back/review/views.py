from rest_framework import generics
from .models import Review
from .serializers import ReviewSerializer
from .paginations import CustomPagination

class ReviewList(generics.ListCreateAPIView):
    queryset = Review.objects.all()
    queryset = queryset.order_by('-updated_at')
    serializer_class = ReviewSerializer
    pagination_class = CustomPagination
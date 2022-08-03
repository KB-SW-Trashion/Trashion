from .models import User
from rest_framework import serializers
from django.core.exceptions import ValidationError as DjangoValidationError
from allauth.account.adapter import get_adapter


class SignUpSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['email', 'password', 'realname', 'nickname', 'address', 'phone', 'height', 'weight']

    def get_cleaned_data(self):
        return {
            'realname': self.validated_data.get('realname', ''),
            'password': self.validated_data.get('password', ''),
            'email': self.validated_data.get('email', ''),
            'nickname': self.validated_data.get('nickname', ''),
            'address': self.validated_data.get('address', ''),
            'phone': self.validated_data.get('phone', ''),
            'height': self.validated_data.get('height', ''),
            'weight': self.validated_data.get('weight', ''),
        }

    def save(self, request):
        adapter = get_adapter()
        user = adapter.new_user(request)
        self.cleaned_data = self.get_cleaned_data()
        user = adapter.save_user(request, user, self, commit=False)
        if "password" in self.cleaned_data:
            try:
                adapter.clean_password(self.cleaned_data['password'], user=user)
            except DjangoValidationError as exc:
                raise serializers.ValidationError(
                    detail=serializers.as_serializer_error(exc)
                )
        user.save()
        return user

from allauth.account.adapter import DefaultAccountAdapter
from allauth.socialaccount.adapter import DefaultSocialAccountAdapter
from .models import Profile

class CustomAccountAdapter(DefaultAccountAdapter):

    def save_user(self, request, user, form, commit=True):
        data = form.cleaned_data
        # 기본 저장 필드: username, email
        user = super().save_user(request, user, form, False)
        # 추가 저장 필드: realname, nickname, address, phone
        nickname = data.get('nickname')
        if nickname:
            user.nickname = nickname
        user.save()
        Profile.objects.create(user=user)
        return user

class CustomSocialLoginAdapter(DefaultSocialAccountAdapter):
    
    def save_user(self, request, sociallogin, form=None):
        u = sociallogin.user
        u.set_unusable_password()
        if form:
            CustomAccountAdapter.save_user(request, u, form)
        sociallogin.save(request)
        Profile.objects.create(user=u)
        return u
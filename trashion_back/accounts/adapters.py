from allauth.account.adapter import DefaultAccountAdapter


class CustomAccountAdapter(DefaultAccountAdapter):

    def save_user(self, request, user, form, commit=True):
        data = form.cleaned_data
        # 기본 저장 필드: username, email
        user = super().save_user(request, user, form, False)
        # 추가 저장 필드: realname, nickname, address, phone
        realname = data.get('realname')
        nickname = data.get('nickname')
        address = data.get('nickname')
        phone = data.get('phone')
        if realname:
            user.realname = realname
        if nickname:
            user.nickname = nickname
        if address:
            user.address = address
        if phone:
            user.phone = phone
        user.save()
        return user

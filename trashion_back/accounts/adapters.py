from allauth.account.adapter import DefaultAccountAdapter


class CustomAccountAdapter(DefaultAccountAdapter):

    def save_user(self, request, user, form, commit=True):
        data = form.cleaned_data
        # 기본 저장 필드: username, email
        user = super().save_user(request, user, form, False)
        # 추가 저장 필드: realname, nickname, address, phone, height, weight
        realname = data.get('realname')
        nickname = data.get('nickname')
        address = data.get('nickname')
        phone = data.get('phone')
        height = data.get('height')
        weight = data.get('weight')
        if realname:
            user.realname = realname
        if nickname:
            user.nickname = nickname
        if address:
            user.address = address
        if phone:
            user.phone = phone
        if height:
            user.height = height
        if weight:
            user.weight = weight
        user.save()
        return user

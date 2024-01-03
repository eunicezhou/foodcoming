import pytest
from module.jsonify import *
from module.database import *
from blueprint_file.member import Member

# 測試註冊功能
def test_signup():
    member = Member(account="", email="", password="", phone="")
    # 測試不存在的會員
    result = member.signup("new_account", "new_email@example.com", "password123", "0988888888")
    assert result['data'] == 'success'

    # 測試已存在的會員
    result = member.signup("member1", "member1@gmail.com", "1", "0988877766")
    assert result['error'] == True
    assert 'member already exist!' in result['message']

# 測試登入功能
def test_login():
    member = Member(account="", email="", password="", phone="")
    # 測試不存在的會員
    result = member.login("nonexistent_email@example.com", "password123")
    assert result['error'] == True
    assert "您尚未註冊會員" in result['message']

    # 測試存在的會員，但密碼錯誤
    result = member.login("member1@gmail.com", "wrong_password")
    assert result['error'] == True

    # 測試正確的登入
    result = member.login("member1@gmail.com", "1")
    assert isinstance(result, str)  # 確保返回的是字串，即 Token 
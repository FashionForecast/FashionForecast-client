const weatherCoordinateList: Record<
  string,
  { weatherNx: number; weatherNy: number }
> = {
  "서울특별시 종로구": {
    "weatherNx": 60,
    "weatherNy": 127
  },
  "서울특별시 중구": {
    "weatherNx": 60,
    "weatherNy": 127
  },
  "서울특별시 용산구": {
    "weatherNx": 60,
    "weatherNy": 126
  },
  "서울특별시 성동구": {
    "weatherNx": 61,
    "weatherNy": 127
  },
  "서울특별시 광진구": {
    "weatherNx": 62,
    "weatherNy": 126
  },
  "서울특별시 동대문구": {
    "weatherNx": 61,
    "weatherNy": 127
  },
  "서울특별시 중랑구": {
    "weatherNx": 62,
    "weatherNy": 128
  },
  "서울특별시 성북구": {
    "weatherNx": 61,
    "weatherNy": 127
  },
  "서울특별시 강북구": {
    "weatherNx": 61,
    "weatherNy": 128
  },
  "서울특별시 도봉구": {
    "weatherNx": 61,
    "weatherNy": 129
  },
  "서울특별시 노원구": {
    "weatherNx": 61,
    "weatherNy": 129
  },
  "서울특별시 은평구": {
    "weatherNx": 59,
    "weatherNy": 127
  },
  "서울특별시 서대문구": {
    "weatherNx": 59,
    "weatherNy": 127
  },
  "서울특별시 마포구": {
    "weatherNx": 59,
    "weatherNy": 127
  },
  "서울특별시 양천구": {
    "weatherNx": 58,
    "weatherNy": 126
  },
  "서울특별시 강서구": {
    "weatherNx": 58,
    "weatherNy": 126
  },
  "서울특별시 구로구": {
    "weatherNx": 58,
    "weatherNy": 125
  },
  "서울특별시 금천구": {
    "weatherNx": 59,
    "weatherNy": 124
  },
  "서울특별시 영등포구": {
    "weatherNx": 58,
    "weatherNy": 126
  },
  "서울특별시 동작구": {
    "weatherNx": 59,
    "weatherNy": 125
  },
  "서울특별시 관악구": {
    "weatherNx": 59,
    "weatherNy": 125
  },
  "서울특별시 서초구": {
    "weatherNx": 61,
    "weatherNy": 125
  },
  "서울특별시 강남구": {
    "weatherNx": 61,
    "weatherNy": 126
  },
  "서울특별시 송파구": {
    "weatherNx": 62,
    "weatherNy": 126
  },
  "서울특별시 강동구": {
    "weatherNx": 62,
    "weatherNy": 126
  },
  "부산광역시 중구": {
    "weatherNx": 97,
    "weatherNy": 74
  },
  "부산광역시 서구": {
    "weatherNx": 97,
    "weatherNy": 74
  },
  "부산광역시 동구": {
    "weatherNx": 98,
    "weatherNy": 75
  },
  "부산광역시 영도구": {
    "weatherNx": 98,
    "weatherNy": 74
  },
  "부산광역시 부산진구": {
    "weatherNx": 97,
    "weatherNy": 75
  },
  "부산광역시 동래구": {
    "weatherNx": 98,
    "weatherNy": 76
  },
  "부산광역시 남구": {
    "weatherNx": 98,
    "weatherNy": 75
  },
  "부산광역시 북구": {
    "weatherNx": 96,
    "weatherNy": 76
  },
  "부산광역시 해운대구": {
    "weatherNx": 99,
    "weatherNy": 75
  },
  "부산광역시 사하구": {
    "weatherNx": 96,
    "weatherNy": 74
  },
  "부산광역시 금정구": {
    "weatherNx": 98,
    "weatherNy": 77
  },
  "부산광역시 강서구": {
    "weatherNx": 96,
    "weatherNy": 76
  },
  "부산광역시 연제구": {
    "weatherNx": 98,
    "weatherNy": 76
  },
  "부산광역시 수영구": {
    "weatherNx": 99,
    "weatherNy": 75
  },
  "부산광역시 사상구": {
    "weatherNx": 96,
    "weatherNy": 75
  },
  "부산광역시 기장군": {
    "weatherNx": 100,
    "weatherNy": 77
  },
  "대구광역시 중구": {
    "weatherNx": 89,
    "weatherNy": 90
  },
  "대구광역시 동구": {
    "weatherNx": 90,
    "weatherNy": 91
  },
  "대구광역시 서구": {
    "weatherNx": 88,
    "weatherNy": 90
  },
  "대구광역시 남구": {
    "weatherNx": 89,
    "weatherNy": 90
  },
  "대구광역시 북구": {
    "weatherNx": 89,
    "weatherNy": 91
  },
  "대구광역시 수성구": {
    "weatherNx": 89,
    "weatherNy": 90
  },
  "대구광역시 달서구": {
    "weatherNx": 88,
    "weatherNy": 90
  },
  "대구광역시 달성군": {
    "weatherNx": 86,
    "weatherNy": 88
  },
  "대구광역시 군위군": {
    "weatherNx": 88,
    "weatherNy": 99
  },
  "인천광역시 중구": {
    "weatherNx": 54,
    "weatherNy": 125
  },
  "인천광역시 동구": {
    "weatherNx": 54,
    "weatherNy": 125
  },
  "인천광역시 미추홀구": {
    "weatherNx": 54,
    "weatherNy": 124
  },
  "인천광역시 연수구": {
    "weatherNx": 55,
    "weatherNy": 123
  },
  "인천광역시 남동구": {
    "weatherNx": 56,
    "weatherNy": 124
  },
  "인천광역시 부평구": {
    "weatherNx": 55,
    "weatherNy": 125
  },
  "인천광역시 계양구": {
    "weatherNx": 56,
    "weatherNy": 126
  },
  "인천광역시 서구": {
    "weatherNx": 55,
    "weatherNy": 126
  },
  "인천광역시 강화군": {
    "weatherNx": 51,
    "weatherNy": 130
  },
  "인천광역시 옹진군": {
    "weatherNx": 54,
    "weatherNy": 124
  },
  "광주광역시 동구": {
    "weatherNx": 60,
    "weatherNy": 74
  },
  "광주광역시 서구": {
    "weatherNx": 59,
    "weatherNy": 74
  },
  "광주광역시 남구": {
    "weatherNx": 59,
    "weatherNy": 73
  },
  "광주광역시 북구": {
    "weatherNx": 59,
    "weatherNy": 75
  },
  "광주광역시 광산구": {
    "weatherNx": 57,
    "weatherNy": 74
  },
  "대전광역시 동구": {
    "weatherNx": 68,
    "weatherNy": 100
  },
  "대전광역시 중구": {
    "weatherNx": 68,
    "weatherNy": 100
  },
  "대전광역시 서구": {
    "weatherNx": 67,
    "weatherNy": 100
  },
  "대전광역시 유성구": {
    "weatherNx": 67,
    "weatherNy": 101
  },
  "대전광역시 대덕구": {
    "weatherNx": 68,
    "weatherNy": 100
  },
  "울산광역시 중구": {
    "weatherNx": 102,
    "weatherNy": 84
  },
  "울산광역시 남구": {
    "weatherNx": 102,
    "weatherNy": 84
  },
  "울산광역시 동구": {
    "weatherNx": 104,
    "weatherNy": 83
  },
  "울산광역시 북구": {
    "weatherNx": 103,
    "weatherNy": 85
  },
  "울산광역시 울주군": {
    "weatherNx": 101,
    "weatherNy": 84
  },
  "세종특별자치시 세종특별자치시": {
    "weatherNx": 66,
    "weatherNy": 103
  },
  "경기도 수원시 장안구": {
    "weatherNx": 60,
    "weatherNy": 121
  },
  "경기도 수원시 권선구": {
    "weatherNx": 60,
    "weatherNy": 120
  },
  "경기도 수원시 팔달구": {
    "weatherNx": 61,
    "weatherNy": 121
  },
  "경기도 수원시 영통구": {
    "weatherNx": 61,
    "weatherNy": 120
  },
  "경기도 성남시 수정구": {
    "weatherNx": 63,
    "weatherNy": 124
  },
  "경기도 성남시 중원구": {
    "weatherNx": 63,
    "weatherNy": 124
  },
  "경기도 성남시 분당구": {
    "weatherNx": 62,
    "weatherNy": 123
  },
  "경기도 의정부시": {
    "weatherNx": 61,
    "weatherNy": 130
  },
  "경기도 안양시 만안구": {
    "weatherNx": 59,
    "weatherNy": 123
  },
  "경기도 안양시 동안구": {
    "weatherNx": 59,
    "weatherNy": 123
  },
  "경기도 부천시 원미구": {
    "weatherNx": 57,
    "weatherNy": 125
  },
  "경기도 부천시 소사구": {
    "weatherNx": 57,
    "weatherNy": 125
  },
  "경기도 부천시 오정구": {
    "weatherNx": 57,
    "weatherNy": 126
  },
  "경기도 광명시": {
    "weatherNx": 58,
    "weatherNy": 125
  },
  "경기도 평택시": {
    "weatherNx": 62,
    "weatherNy": 114
  },
  "경기도 동두천시": {
    "weatherNx": 61,
    "weatherNy": 134
  },
  "경기도 안산시 상록구": {
    "weatherNx": 58,
    "weatherNy": 121
  },
  "경기도 안산시 단원구": {
    "weatherNx": 57,
    "weatherNy": 121
  },
  "경기도 고양시 덕양구": {
    "weatherNx": 57,
    "weatherNy": 128
  },
  "경기도 고양시 일산동구": {
    "weatherNx": 56,
    "weatherNy": 129
  },
  "경기도 고양시 일산서구": {
    "weatherNx": 56,
    "weatherNy": 129
  },
  "경기도 과천시": {
    "weatherNx": 60,
    "weatherNy": 124
  },
  "경기도 구리시": {
    "weatherNx": 62,
    "weatherNy": 127
  },
  "경기도 남양주시": {
    "weatherNx": 64,
    "weatherNy": 128
  },
  "경기도 오산시": {
    "weatherNx": 62,
    "weatherNy": 118
  },
  "경기도 시흥시": {
    "weatherNx": 57,
    "weatherNy": 123
  },
  "경기도 군포시": {
    "weatherNx": 59,
    "weatherNy": 122
  },
  "경기도 의왕시": {
    "weatherNx": 60,
    "weatherNy": 122
  },
  "경기도 하남시": {
    "weatherNx": 64,
    "weatherNy": 126
  },
  "경기도 용인시 처인구": {
    "weatherNx": 64,
    "weatherNy": 119
  },
  "경기도 용인시 기흥구": {
    "weatherNx": 62,
    "weatherNy": 120
  },
  "경기도 용인시 수지구": {
    "weatherNx": 62,
    "weatherNy": 121
  },
  "경기도 파주시": {
    "weatherNx": 56,
    "weatherNy": 131
  },
  "경기도 이천시": {
    "weatherNx": 68,
    "weatherNy": 121
  },
  "경기도 안성시": {
    "weatherNx": 65,
    "weatherNy": 115
  },
  "경기도 김포시": {
    "weatherNx": 55,
    "weatherNy": 128
  },
  "경기도 화성시": {
    "weatherNx": 57,
    "weatherNy": 119
  },
  "경기도 광주시": {
    "weatherNx": 65,
    "weatherNy": 123
  },
  "경기도 양주시": {
    "weatherNx": 61,
    "weatherNy": 131
  },
  "경기도 포천시": {
    "weatherNx": 64,
    "weatherNy": 134
  },
  "경기도 여주시": {
    "weatherNx": 71,
    "weatherNy": 121
  },
  "경기도 연천군": {
    "weatherNx": 61,
    "weatherNy": 138
  },
  "경기도 가평군": {
    "weatherNx": 69,
    "weatherNy": 133
  },
  "경기도 양평군": {
    "weatherNx": 69,
    "weatherNy": 125
  },
  "충청북도 청주시 상당구": {
    "weatherNx": 69,
    "weatherNy": 106
  },
  "충청북도 청주시 서원구": {
    "weatherNx": 69,
    "weatherNy": 107
  },
  "충청북도 청주시 흥덕구": {
    "weatherNx": 67,
    "weatherNy": 106
  },
  "충청북도 청주시 청원구": {
    "weatherNx": 69,
    "weatherNy": 107
  },
  "충청북도 충주시": {
    "weatherNx": 76,
    "weatherNy": 114
  },
  "충청북도 제천시": {
    "weatherNx": 81,
    "weatherNy": 118
  },
  "충청북도 보은군": {
    "weatherNx": 73,
    "weatherNy": 103
  },
  "충청북도 옥천군": {
    "weatherNx": 71,
    "weatherNy": 99
  },
  "충청북도 영동군": {
    "weatherNx": 74,
    "weatherNy": 97
  },
  "충청북도 증평군": {
    "weatherNx": 71,
    "weatherNy": 110
  },
  "충청북도 진천군": {
    "weatherNx": 68,
    "weatherNy": 111
  },
  "충청북도 괴산군": {
    "weatherNx": 74,
    "weatherNy": 111
  },
  "충청북도 음성군": {
    "weatherNx": 72,
    "weatherNy": 113
  },
  "충청북도 단양군": {
    "weatherNx": 84,
    "weatherNy": 115
  },
  "충청남도 천안시 동남구": {
    "weatherNx": 63,
    "weatherNy": 110
  },
  "충청남도 천안시 서북구": {
    "weatherNx": 63,
    "weatherNy": 112
  },
  "충청남도 공주시": {
    "weatherNx": 63,
    "weatherNy": 102
  },
  "충청남도 보령시": {
    "weatherNx": 54,
    "weatherNy": 100
  },
  "충청남도 아산시": {
    "weatherNx": 60,
    "weatherNy": 110
  },
  "충청남도 서산시": {
    "weatherNx": 51,
    "weatherNy": 110
  },
  "충청남도 논산시": {
    "weatherNx": 62,
    "weatherNy": 97
  },
  "충청남도 계룡시": {
    "weatherNx": 65,
    "weatherNy": 99
  },
  "충청남도 당진시": {
    "weatherNx": 54,
    "weatherNy": 112
  },
  "충청남도 금산군": {
    "weatherNx": 69,
    "weatherNy": 95
  },
  "충청남도 부여군": {
    "weatherNx": 59,
    "weatherNy": 99
  },
  "충청남도 서천군": {
    "weatherNx": 55,
    "weatherNy": 94
  },
  "충청남도 청양군": {
    "weatherNx": 57,
    "weatherNy": 103
  },
  "충청남도 홍성군": {
    "weatherNx": 55,
    "weatherNy": 106
  },
  "충청남도 예산군": {
    "weatherNx": 58,
    "weatherNy": 107
  },
  "충청남도 태안군": {
    "weatherNx": 48,
    "weatherNy": 109
  },
  "전라남도 목포시": {
    "weatherNx": 50,
    "weatherNy": 67
  },
  "전라남도 여수시": {
    "weatherNx": 73,
    "weatherNy": 66
  },
  "전라남도 순천시": {
    "weatherNx": 70,
    "weatherNy": 70
  },
  "전라남도 나주시": {
    "weatherNx": 56,
    "weatherNy": 71
  },
  "전라남도 광양시": {
    "weatherNx": 73,
    "weatherNy": 70
  },
  "전라남도 담양군": {
    "weatherNx": 61,
    "weatherNy": 78
  },
  "전라남도 곡성군": {
    "weatherNx": 66,
    "weatherNy": 77
  },
  "전라남도 구례군": {
    "weatherNx": 69,
    "weatherNy": 75
  },
  "전라남도 고흥군": {
    "weatherNx": 66,
    "weatherNy": 62
  },
  "전라남도 보성군": {
    "weatherNx": 62,
    "weatherNy": 66
  },
  "전라남도 화순군": {
    "weatherNx": 61,
    "weatherNy": 72
  },
  "전라남도 장흥군": {
    "weatherNx": 59,
    "weatherNy": 64
  },
  "전라남도 강진군": {
    "weatherNx": 57,
    "weatherNy": 63
  },
  "전라남도 해남군": {
    "weatherNx": 54,
    "weatherNy": 61
  },
  "전라남도 영암군": {
    "weatherNx": 56,
    "weatherNy": 66
  },
  "전라남도 무안군": {
    "weatherNx": 52,
    "weatherNy": 71
  },
  "전라남도 함평군": {
    "weatherNx": 52,
    "weatherNy": 72
  },
  "전라남도 영광군": {
    "weatherNx": 52,
    "weatherNy": 77
  },
  "전라남도 장성군": {
    "weatherNx": 57,
    "weatherNy": 77
  },
  "전라남도 완도군": {
    "weatherNx": 57,
    "weatherNy": 56
  },
  "전라남도 진도군": {
    "weatherNx": 48,
    "weatherNy": 59
  },
  "전라남도 신안군": {
    "weatherNx": 50,
    "weatherNy": 66
  },
  "경상북도 포항시 남구": {
    "weatherNx": 102,
    "weatherNy": 94
  },
  "경상북도 포항시 북구": {
    "weatherNx": 102,
    "weatherNy": 95
  },
  "경상북도 경주시": {
    "weatherNx": 100,
    "weatherNy": 91
  },
  "경상북도 김천시": {
    "weatherNx": 80,
    "weatherNy": 96
  },
  "경상북도 안동시": {
    "weatherNx": 91,
    "weatherNy": 106
  },
  "경상북도 구미시": {
    "weatherNx": 84,
    "weatherNy": 96
  },
  "경상북도 영주시": {
    "weatherNx": 89,
    "weatherNy": 111
  },
  "경상북도 영천시": {
    "weatherNx": 95,
    "weatherNy": 93
  },
  "경상북도 상주시": {
    "weatherNx": 81,
    "weatherNy": 102
  },
  "경상북도 문경시": {
    "weatherNx": 81,
    "weatherNy": 106
  },
  "경상북도 경산시": {
    "weatherNx": 91,
    "weatherNy": 90
  },
  "경상북도 의성군": {
    "weatherNx": 90,
    "weatherNy": 101
  },
  "경상북도 청송군": {
    "weatherNx": 96,
    "weatherNy": 103
  },
  "경상북도 영양군": {
    "weatherNx": 97,
    "weatherNy": 108
  },
  "경상북도 영덕군": {
    "weatherNx": 102,
    "weatherNy": 103
  },
  "경상북도 청도군": {
    "weatherNx": 91,
    "weatherNy": 86
  },
  "경상북도 고령군": {
    "weatherNx": 83,
    "weatherNy": 87
  },
  "경상북도 성주군": {
    "weatherNx": 83,
    "weatherNy": 91
  },
  "경상북도 칠곡군": {
    "weatherNx": 85,
    "weatherNy": 93
  },
  "경상북도 예천군": {
    "weatherNx": 86,
    "weatherNy": 107
  },
  "경상북도 봉화군": {
    "weatherNx": 90,
    "weatherNy": 113
  },
  "경상북도 울진군": {
    "weatherNx": 102,
    "weatherNy": 115
  },
  "경상북도 울릉군": {
    "weatherNx": 127,
    "weatherNy": 127
  },
  "경상남도 창원시 의창구": {
    "weatherNx": 90,
    "weatherNy": 77
  },
  "경상남도 창원시 성산구": {
    "weatherNx": 91,
    "weatherNy": 76
  },
  "경상남도 창원시 마산합포구": {
    "weatherNx": 89,
    "weatherNy": 76
  },
  "경상남도 창원시 마산회원구": {
    "weatherNx": 89,
    "weatherNy": 76
  },
  "경상남도 창원시 진해구": {
    "weatherNx": 91,
    "weatherNy": 75
  },
  "경상남도 진주시": {
    "weatherNx": 81,
    "weatherNy": 75
  },
  "경상남도 통영시": {
    "weatherNx": 87,
    "weatherNy": 68
  },
  "경상남도 사천시": {
    "weatherNx": 80,
    "weatherNy": 71
  },
  "경상남도 김해시": {
    "weatherNx": 95,
    "weatherNy": 77
  },
  "경상남도 밀양시": {
    "weatherNx": 92,
    "weatherNy": 83
  },
  "경상남도 거제시": {
    "weatherNx": 90,
    "weatherNy": 69
  },
  "경상남도 양산시": {
    "weatherNx": 97,
    "weatherNy": 79
  },
  "경상남도 의령군": {
    "weatherNx": 83,
    "weatherNy": 78
  },
  "경상남도 함안군": {
    "weatherNx": 86,
    "weatherNy": 77
  },
  "경상남도 창녕군": {
    "weatherNx": 87,
    "weatherNy": 83
  },
  "경상남도 고성군": {
    "weatherNx": 85,
    "weatherNy": 71
  },
  "경상남도 남해군": {
    "weatherNx": 77,
    "weatherNy": 68
  },
  "경상남도 하동군": {
    "weatherNx": 74,
    "weatherNy": 73
  },
  "경상남도 산청군": {
    "weatherNx": 76,
    "weatherNy": 80
  },
  "경상남도 함양군": {
    "weatherNx": 74,
    "weatherNy": 82
  },
  "경상남도 거창군": {
    "weatherNx": 77,
    "weatherNy": 86
  },
  "경상남도 합천군": {
    "weatherNx": 81,
    "weatherNy": 84
  },
  "제주특별자치도 제주시": {
    "weatherNx": 53,
    "weatherNy": 38
  },
  "제주특별자치도 서귀포시": {
    "weatherNx": 52,
    "weatherNy": 33
  },
  "강원특별자치도 춘천시": {
    "weatherNx": 73,
    "weatherNy": 134
  },
  "강원특별자치도 원주시": {
    "weatherNx": 76,
    "weatherNy": 122
  },
  "강원특별자치도 강릉시": {
    "weatherNx": 92,
    "weatherNy": 131
  },
  "강원특별자치도 동해시": {
    "weatherNx": 97,
    "weatherNy": 127
  },
  "강원특별자치도 태백시": {
    "weatherNx": 95,
    "weatherNy": 119
  },
  "강원특별자치도 속초시": {
    "weatherNx": 87,
    "weatherNy": 141
  },
  "강원특별자치도 삼척시": {
    "weatherNx": 98,
    "weatherNy": 125
  },
  "강원특별자치도 홍천군": {
    "weatherNx": 75,
    "weatherNy": 130
  },
  "강원특별자치도 횡성군": {
    "weatherNx": 77,
    "weatherNy": 125
  },
  "강원특별자치도 영월군": {
    "weatherNx": 86,
    "weatherNy": 119
  },
  "강원특별자치도 평창군": {
    "weatherNx": 84,
    "weatherNy": 123
  },
  "강원특별자치도 정선군": {
    "weatherNx": 89,
    "weatherNy": 123
  },
  "강원특별자치도 철원군": {
    "weatherNx": 65,
    "weatherNy": 139
  },
  "강원특별자치도 화천군": {
    "weatherNx": 72,
    "weatherNy": 139
  },
  "강원특별자치도 양구군": {
    "weatherNx": 77,
    "weatherNy": 139
  },
  "강원특별자치도 인제군": {
    "weatherNx": 80,
    "weatherNy": 138
  },
  "강원특별자치도 고성군": {
    "weatherNx": 85,
    "weatherNy": 145
  },
  "강원특별자치도 양양군": {
    "weatherNx": 88,
    "weatherNy": 138
  },
  "전북특별자치도 전주시 완산구": {
    "weatherNx": 63,
    "weatherNy": 89
  },
  "전북특별자치도 전주시 덕진구": {
    "weatherNx": 63,
    "weatherNy": 89
  },
  "전북특별자치도 군산시": {
    "weatherNx": 56,
    "weatherNy": 92
  },
  "전북특별자치도 익산시": {
    "weatherNx": 60,
    "weatherNy": 91
  },
  "전북특별자치도 정읍시": {
    "weatherNx": 58,
    "weatherNy": 83
  },
  "전북특별자치도 남원시": {
    "weatherNx": 68,
    "weatherNy": 80
  },
  "전북특별자치도 김제시": {
    "weatherNx": 59,
    "weatherNy": 88
  },
  "전북특별자치도 완주군": {
    "weatherNx": 63,
    "weatherNy": 89
  },
  "전북특별자치도 진안군": {
    "weatherNx": 68,
    "weatherNy": 88
  },
  "전북특별자치도 무주군": {
    "weatherNx": 72,
    "weatherNy": 93
  },
  "전북특별자치도 장수군": {
    "weatherNx": 70,
    "weatherNy": 85
  },
  "전북특별자치도 임실군": {
    "weatherNx": 66,
    "weatherNy": 84
  },
  "전북특별자치도 순창군": {
    "weatherNx": 63,
    "weatherNy": 79
  },
  "전북특별자치도 고창군": {
    "weatherNx": 56,
    "weatherNy": 80
  },
  "전북특별자치도 부안군": {
    "weatherNx": 56,
    "weatherNy": 87
  }
}
 export default weatherCoordinateList
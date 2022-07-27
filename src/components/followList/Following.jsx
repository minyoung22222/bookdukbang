import React, { useEffect, useState } from 'react';
import { SERVER_URL } from '../../constants';
import { NoneProfileSmall } from '../common/user/UserUpload';
import {
	UserLi,
	UserInfo,
	FollowBtn,
	FollowingBtn,
} from '../followList/FollowList.style';

function Followings() {
	const token = JSON.parse(localStorage.getItem('user')).token;
	const AccountName = JSON.parse(localStorage.getItem('user')).accountname;

	const [Following, setFollowing] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		if (isLoading) {
			UserFollowingList();
			setIsLoading(false);
		}
	}, [isLoading]);

	// 팔로잉 리스트 (내가 팔로우한 사용자 목록)
	async function UserFollowingList() {
		try {
			const res = await fetch(
				SERVER_URL + `/profile/${AccountName}/following?limit=30`,
				{
					method: 'GET',
					headers: {
						Authorization: `Bearer ${token}`,
						'Content-type': 'application/json',
					},
				},
			);
			const result = await res.json();
			setFollowing(result);
		} catch (error) {
			console.error(error);
		}
	}
	useEffect(() => {
		UserFollowingList();
	}, []);

	// 팔로우
	async function Follow(useraccount) {
		try {
			const res = await fetch(
				SERVER_URL + `/profile/${useraccount}/follow`,
				{
					method: 'POST',
					headers: {
						Authorization: `Bearer ${token}`,
						'Content-type': 'application/json',
					},
				},
			);
			const result = await res.json();
			console.log(result);
			setIsLoading(true);
		} catch (error) {
			console.error(error);
		}
	}

	// 언팔로우
	async function UnFollow(useraccount) {
		try {
			const res = await fetch(
				SERVER_URL + `/profile/${useraccount}/unfollow`,
				{
					method: 'DELETE',
					headers: {
						Authorization: `Bearer ${token}`,
						'Content-type': 'application/json',
					},
				},
			);
			const result = await res.json();
			console.log(result);
			setIsLoading(true);
		} catch (error) {
			console.error(error);
		}
	}

	return (
		<>
			{Following !== null &&
				Following.map((item, i) => (
					<UserLi key={i}>
						<NoneProfileSmall
							style={{
								backgroundImage: `url(${item.image})`,
							}}
						/>
						<UserInfo>
							{item.username}
							<p>@ {item.accountname}</p>
						</UserInfo>

						{item.isfollow ? (
							<FollowingBtn
								type="button"
								onClick={() => UnFollow(item.accountname)}
							>
								팔로잉
							</FollowingBtn>
						) : (
							<FollowBtn
								type="button"
								onClick={() => Follow(item.accountname)}
							>
								팔로우
							</FollowBtn>
						)}
					</UserLi>
				))}
		</>
	);
}

export default Followings;

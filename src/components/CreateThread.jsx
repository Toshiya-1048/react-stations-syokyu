import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/CreateThread.css"

const CreateThread= () =>{
	const [title, setTitle] = useState('');
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();

		const requestBody = {
			title: title,
		};

		try {
			const response = await fetch('https://railway.bulletinboard.techtrain.dev/threads',{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(requestBody),
			});

			if(response.ok){
				const data = await response.json();
				console.log('スレッドが作成されました:', data);
				navigate('/');
			} else {
				console.error('スレッド作成に失敗しました');
			}
		} catch (error) {
			console.error('エラーが発生しました',error);
		}
	};

	return (
		<div className="create-thread-container">
			<h2>新規スレッド作成</h2>
			<form onSubmit={handleSubmit}>
				<div className="form-group">
					<label htmlFor="title"></label>
					<input
						type="text"
						id="title"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						placeholder="スレッドタイトルを入力してください"
						required
					/>
				</div>
				<button type="submit">作成</button>
			</form>
		</div>
	);
};

export default CreateThread;
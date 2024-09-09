import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Category = () => {
	const [category, setCategory] = useState([]);
	const [error, setError] = useState(null);

	useEffect(() => {
		axios.get("http://localhost:3000/auth/category")
			.then(res => {
				if(res.data.Status){
					setCategory(res.data.data)
				}else{
					alert(res.data.Error)
				}
			})
			.catch(err => {
				console.error("Failed to fetch categories:", err);
				setError("Failed to load categories.");
			});
	}, []);

	const handleDelete = (id) => {
		axios.delete(`http://localhost:3000/auth/delete_category/${id}`)
			.then(res => {
				if (res.data.Status) {
					alert("Department deleted successfully");
					setCategory(category.filter(c => c.id !== id));
				} else {
					alert(res.data.Error);
				}
			})
			.catch(err => {
				console.error("Failed to delete Department:", err);
				setError("Failed to delete Department.");
			});
	};

	return (
		<div className='px-5 mt-5'>
			<div className='d-flex justify-content-center '>
				<h3>Department List</h3>
			</div>
			{error && <p className="text-danger">{error}</p>}
			<Link to="/dashboard/add_category" className='btn btn-success mt-3'>Add Department</Link>
			<div>
				<table className='table table-striped'>
					<thead>
						<tr>
							<th>Department</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody>
						{category.map((c, index) => (
							<tr key={index}>
								<td>{c.name}</td>
								<td>
									<button
										className="btn btn-danger"
										onClick={() => handleDelete(c.id)}
									>
										Delete
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}

export default Category;

import React, {Component, PropTypes} from 'react';
const update = require('react-addons-update');

let recruitItems = [
	{department:'工程研发部门',total:120,children:[
		{position:'Mac 开发工程师',num:9},{position:'IOS App 测试工程师',num:17},
		{position:'Android 远程控制工程师',num:61},{position:'Web 前端工程师',num:31},
		{position:'Android 多媒体软件开发工程师',num:2}
	]},
	{department:'产品设计部门',total:136,children:[
		{position:'网页设计师',num:47},{position:'ID/工业设计师',num:39},
		{position:'视觉设计师/GUI界面设计师',num:42},{position:'平面设计师',num:8}
	]}
];

class RecruitJob extends Component {
	constructor(props) {
		super(props);
	}
	handleClick = (i)=> {
		let arr = update(this.props.selected, {[i]: {$apply:x=>!x}});
		this.props.updateState(this.props.index,arr);
	};
	render() {
		return (
			<ul>
				{
					this.props.jobLists.map((ele,i)=>(
						<li key={i}>
							<i className="checkboxFont" onClick={()=>this.handleClick(i)}>
								{this.props.selected&&this.props.selected[i]?'√':''}
							</i>
							<span className="name">{ele.position}</span>
							<span className="num">{ele.num}</span>
						</li>
					))
				}
			</ul>
		);
	}
}

class Department extends Component {
	constructor(props) {
		super(props);
	}
	handleClick = (index)=> {
		let arr = this.props.checked[index];
		let allChecked = arr&&arr.every(x=>x);
		for (let i=0; i<arr.length; i++) {
			arr[i] = !allChecked;
		}
		this.props.updateState(index,arr);
	};
	render() {
		return (
			<div>
				{
					this.props.items.map((item,index)=>{
						let childArrs = this.props.checked[index];
						return (
							<div key={index} className="sidebarContent">
								<p>
									<i className="checkboxFont" onClick={()=>this.handleClick(index)}>
										{childArrs.length>0 && childArrs.every(x=>x) ? '√' : ''}
									</i>
									<span className="name">{item.department}</span>
									<span className="num">{item.total}</span>
								</p>
								<RecruitJob jobLists={item.children}
								            index={index}
								            selected={childArrs}
								            updateState={this.props.updateState}
								/>
							</div>
						)
					})
				}
			</div>
		);
	}
}

export class LeftSide extends Component {
	constructor(props) {
		super(props);
		let checked = [];
		for (let i=0; i<recruitItems.length; i++) {
			let length = recruitItems[i].children.length;
			let arr = [];
			for (let j=0; j<length; j++) {
				arr[j] = false;
			}
			checked.push(arr);
		}
		this.state = {checked:checked};
	}
	updateState = (index,arr)=> {
		this.setState(update(this.state, {checked: {[index]: {$apply:x=>arr}}}));
	};
	handleEmpty = ()=> {
		let checked = [];
		for (let i=0; i<this.state.checked.length; i++) {
			let arr = this.state.checked[i];
			for (let j=0; j<arr.length; j++) {
				arr[j] = false;
			}
			checked.push(arr);
		}
		this.setState({checked:checked});
	};
	render() {
		return (
			<div className="sidebar">
				<p className="sidebarHeader">招聘职位<span onClick={this.handleEmpty}>清空</span></p>
				<Department items={recruitItems} updateState={this.updateState} checked={this.state.checked}/>
			</div>
		);
	}
}

export default LeftSide;

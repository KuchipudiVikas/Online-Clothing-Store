import './categories.styles.scss';

const CategoryItem = ({ id, category }) => {
    const { title, imageUrl } = category;
    return (
        <div key={id} className="category-container">
            <div className='background-image' style={{
                backgroundImage: `url(${imageUrl})`
            }} />
            <div className="category-body-container">
                <h2>{title}</h2>
                <p>shop now</p>
            </div>
        </div>
    )
}



export default CategoryItem;
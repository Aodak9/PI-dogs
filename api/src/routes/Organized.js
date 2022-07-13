// let OrderAPI = (data) => {
//     let dataOrder = []
//     data.forEach(el => {
//         dataOrder.push({
//             id: el.id,
//             name: el.name,
//             weight: el.weight,
//             height: el.height,
//             life_span: el.life_span,
//             temperament: el.temperaments?.split(', '),
//             image: el.image.url,
//         })
//     })
//     return dataOrder
// }

// let OrderBD = (data) => {
//     let dataOrder = []
//     data.forEach(el =>{
//         dataOrder.push({
//             id: el.id,
//             name: el.name,
//             weight: el.weight,
//             height: el.weight,
//             life_span: el.life_span,
//             temperament: el.temperaments.map(el => el.name),
//             image: el.image
//         })
//     })
//     return dataOrder
// }

// module.exports = {
//     OrderAPI,
//     OrderBD
// }
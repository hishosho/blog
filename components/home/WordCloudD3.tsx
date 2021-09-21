import * as d3 from 'd3'
import * as cloud from 'd3-cloud'
import { useEffect, useContext, useCallback } from 'react'
import { Context } from '../../store'

interface Size {
  width: number;
  height: number;
}

interface childProps {
  contentSize: Size;
  selectWord: Function;
}

const WordCloudD3 = (props: childProps) => {
  const { globalState, dispatch } = useContext<any>(Context)
  const { contentSize,
          selectWord
        } = props
  const words = [
    'JavaScript',
    'TypeScript',
    'Node.js',
    '实践是检验真理的唯一标准',
    '博客',
    'Talk is cheap, show me your code!', 
    '摄影集',
    '认识你自己',
    '试验田',
    '计算机图形学',
    'Vue.js',
    'React.js',
    'Next.js',
    'Html5',
    'CSS3',
    'Canvas',
    'SVG',
    'd3.js',
    '算法',
    '数据结构',
    '设计模式',
    '学吧，学无止境，太深啦（请自行脑补彪哥图）',
    'JavaScript',
    'TypeScript',
    'Node.js',
    '实践是检验真理的唯一标准',
    '博客',
    'Talk is cheap, show me your code!', 
    '摄影集',
    '认识你自己',
    '试验田',
    '计算机图形学',
    'Vue.js',
    'React.js',
    'Next.js',
    'Html5',
    'CSS3',
    'Canvas',
    'SVG',
    'd3.js',
    '算法',
    '数据结构',
    '设计模式',
    '学吧，学无止境，太深啦（请自行脑补彪哥图）',
  ].map((d, i) => {
      let size = 0
      if (globalState.isMobile) {
        size = d.length > 5 ? 5 : 10 + Math.random() * 50
      } else {
        size = d.length > 5 ? 20 : 10 + Math.random() * 90
      }
      const colors: string[] = ['', '#6F69AC', '#95DAC1', '#FF6B6B', '#FD6F96']
      const color: string = colors[Math.floor(Math.random() * 4 + 1)]
      return {id: i, text: d, size, color}
    })

  const draw = useCallback((words: []) => {
    d3.select('#wordCloud').append('svg')
      .attr('width', contentSize.width)
      .attr('height', contentSize.height)
      .append('g')
        .attr('transform', `translate(${contentSize.width / 2},${contentSize.height / 2})`)
      .selectAll('text')
        .data(words)
      .enter().append('text')
        .style('font-size', (d: any) => `${d.size}px`)
        .style('font-family', (d: any) => d.length > 2 ? 'Times' : 'Impact')
        .style('fill', (d: any) => d.color)
        .attr('id', (d: any) => d.id)
        .attr('text-anchor', 'middle')
        .attr('stroke-width', 2)
        .on('click', (e: PointerEvent) => {

        })
        .transition()
          .duration(600)
          .attr('transform', (d: any) => `translate(${[d.x, d.y]})rotate(${d.rotate})`)
          .style('fill-opacity', 1)
        .text((d: any) => d.text)
  }, [contentSize])

  const buildCloud = useCallback(() => {
    cloud.default()
      .size([contentSize.width, contentSize.height])
      .words(words)
      .padding(20)
      .rotate(() => (~~(Math.random() * 6) - 3) * 30)
      .font('Impact')
      .spiral('archimedean')
      .fontSize((d: any) => d.size)
      .on('end', draw)
      .start()
  }, [contentSize, draw, words])
  
  useEffect(() => {
    d3.selectAll('svg').remove()
    if (globalState.clientSize.width === 0 && globalState.clientSize.height === 0) return
    buildCloud()
  }, [buildCloud, globalState.clientSize])

  return <div id='wordCloud'></div>
}

  export default WordCloudD3
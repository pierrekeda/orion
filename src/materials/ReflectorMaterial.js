/**
 * @author pschroen / https://ufo.ai/
 */

import { Color, GLSL3, Matrix3, Matrix4, RawShaderMaterial, Uniform } from 'three';

import vertexShader from '../glsl/ReflectorMaterial.vert.glsl';
import fragmentShader from '../glsl/ReflectorMaterial.frag.glsl';

export class ReflectorMaterial extends RawShaderMaterial {

	constructor( {
		color = new Color( 0x7F7F7F ),
		map = null,
		fog = null,
		dithering = false
	} = {} ) {

		const parameters = {
			glslVersion: GLSL3,
			defines: {
			},
			uniforms: {
				tMap: new Uniform( null ),
				tReflect: new Uniform( null ),
				uMapTransform: new Uniform( new Matrix3() ),
				uMatrix: new Uniform( new Matrix4() ),
				uColor: new Uniform( color instanceof Color ? color : new Color( color ) )
			},
			vertexShader,
			fragmentShader
		};

		if ( map ) {

			map.updateMatrix();

			parameters.uniforms = Object.assign( parameters.uniforms, {
				tMap: new Uniform( map ),
				uMapTransform: new Uniform( map.matrix )
			} );

		}

		if ( fog ) {

			parameters.defines = Object.assign( parameters.defines, {
				USE_FOG: ''
			} );

			parameters.uniforms = Object.assign( parameters.uniforms, {
				uFogColor: new Uniform( fog.color ),
				uFogNear: new Uniform( fog.near ),
				uFogFar: new Uniform( fog.far )
			} );

		}

		if ( dithering ) {

			parameters.defines = Object.assign( parameters.defines, {
				DITHERING: ''
			} );

		}

		super( parameters );

	}

}
